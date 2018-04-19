import { log } from 'util';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as metrics from 'node-monitor-ui';
import serverDecorator from './config/serverDecorator'

dotenv.config();

const app = express();
const boot = () => {
    app.listen(app.get('port'), () => {
        log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
    });

    if (app.get('metrics')) {
        metrics.init(3001);
    }
};

serverDecorator(app).then(boot).catch((err) => {
    console.log('Impossssssible to sssstart', err);
});

