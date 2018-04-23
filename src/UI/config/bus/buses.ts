import { Express } from 'express';
import Buses from 'infra/shared/dependencyInjection/busFactory';

export default async(app: Express) => {
    const { AppQueryBus,AppCommandBus } = await Buses();
    app.set('queryBus', AppQueryBus);
    app.set('commandBus', AppCommandBus);
}
