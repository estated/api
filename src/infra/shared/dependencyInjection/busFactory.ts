import { Application } from 'hollywood-js';
import GetUserByUuidQuery from 'application/query/user/getByUuid/getUserByUuidQuery';
import GetUserByUuidHandler from 'application/query/user/getByUuid/getUserByUuidHandler';
import CreateUserCommand from 'application/command/user/create/createUserCommand';
import CreateUserHandler from 'application/command/user/create/createUserHandler';
import userRepository  from './repositories/userRepositoryFactory';
import { getUser } from "infra/shared/dependencyInjection/repositories/userRepositoryFactory";
import CreatePropertyCommand from '../../../application/command/property/create/createPropertyCommand';
import CreatePropertyHandler from '../../../application/command/property/create/createPropertyHandler';
import propertyRepositoryFactory from "infra/shared/dependencyInjection/repositories/propertyRepositoryFactory";
import { eventBus } from "infra/shared/dependencyInjection/eventStore/eventStore";
import Register from "infra/shared/dependencyInjection/eventListeners/registerListeners";

const commandResolver = new Application.CommandHandlerResolver();
const queryResolver =  new Application.QueryHandlerResolver();

queryResolver
    .addHandler(GetUserByUuidQuery, new GetUserByUuidHandler(getUser))
;

commandResolver
    .addHandler(CreateUserCommand, new CreateUserHandler(getUser, userRepository))
    .addHandler(CreatePropertyCommand, new CreatePropertyHandler(propertyRepositoryFactory))
;

const AppQueryBus = new Application.QueryBus(queryResolver);
const AppCommandBus = new Application.CommandBus(commandResolver);

export default async () => {

    await Register(eventBus);

    return {
        AppQueryBus,
        AppCommandBus
    }
}

