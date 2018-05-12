import { Express } from 'express';
import { log } from 'util';
import * as bodyParser from "body-parser";
import ExecutableSchema from "ui/config/gql";
import config from "ui/config/config"
import { express as middleware } from 'graphql-voyager/middleware';

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express'); // what a shit

export default (app: Express) => {
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

    log("Imported Route     GET      /graphql");
    log("Imported Route     POST     /graphql");

    if (config.GRAPHIQL) {
        app
            .get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
        log("Imported Route     GET      /graphiql")
    }

    app.use('/voyager', middleware({ endpointUrl: '/graphql' }));

    log("Imported Route     GET      /voyager")

}
