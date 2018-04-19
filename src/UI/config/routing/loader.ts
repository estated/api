import { Express } from 'express';
import { log } from 'util';
import routing, { RouteCollection } from './index';
import * as bodyParser from "body-parser";
import ExecutableSchema from "ui/config/gql";
import config from "ui/config/config"

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express'); // what a shit

const importer = (app: Express, routes: RouteCollection, method: string) => {
    Object.keys(routes).forEach((key: string) => {

        switch (method) {
            case 'get':
                app.get(key, routes[key]);
                break;
            case 'post':
                app.post(key, routes[key]);
                break;
            case 'put':
                app.put(key, routes[key]);
                break;
            case 'delete':
                app.delete(key, routes[key]);
                break;
            default:
                break;
        }

        log("Imported Route     "+ method.toUpperCase() + "     " + key)
    })
};

export default (app: Express) => {
    const routes = routing(app);
    Object.keys(routes).forEach((method: string) => importer(app, routes[method], method));

    app
        .use(
            '/graphql',
            bodyParser.json(),
            graphqlExpress({
                schema: ExecutableSchema(),
                context: {
                    ask: async (query) => (await app.get('queryBus').ask(query)),
                    handle: async (command) => await app.get('commandBus').handle(command)
                }
            })
        );
        log("Imported Route     ALL     /graphql");

    if (config.GRAPHIQL) {
        app
            .get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
            log("Imported Route     GET     /graphiql")
    }

}