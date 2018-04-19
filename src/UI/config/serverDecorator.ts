import { Express } from 'express';
import * as bodyParser from 'body-parser';
import config from './config'
import routingLoader from './routing/loader'
import busFactory from './bus/buses'
import ErrorHandling from './errorHandling';
import ExecutableSchema from './gql'
import * as morgan from 'morgan';
import {log} from "util";

export default async (app: Express) => {

    await busFactory(app);

    app
        .set('port', config.PORT)
        .set('metrics', config.METRICS)

        .use(morgan('combined'))

        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
    ;

    routingLoader(app);
    
    app.use(ErrorHandling)
}