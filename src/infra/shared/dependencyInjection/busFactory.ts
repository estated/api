import { Application } from 'hollywood-js';

import GetUserByUuidQuery from 'application/query/user/getByUuid/getUserByUuidQuery';
import GetUserByUuidHandler from 'application/query/user/getByUuid/getUserByUuidHandler';

import CreateUserCommand from 'application/command/user/create/createUserCommand';
import CreateUserHandler from 'application/command/user/create/createUserHandler';

import CreatePropertyCommand from 'application/command/property/create/createPropertyCommand';
import CreatePropertyHandler from 'application/command/property/create/createPropertyHandler';

import GetPropertyByUuidQuery from "application/query/property/getByUuid/getPropertyByUuidQuery";
import GetPropertyByUuidHandler from "application/query/property/getByUuid/getPropertyByUuidHandler";

import GetAllPropertiesHandler from "application/query/property/getAllProperties/getAllPropertiesHandler";
import GetAllPropertiesQuery from "application/query/property/getAllProperties/getAllPropertiesQuery";

import userRepository, { getUser } from "infra/shared/dependencyInjection/repositories/userRepositoryFactory";
import propertyRepositoryFactory, {getProperty} from "infra/shared/dependencyInjection/repositories/propertyRepositoryFactory";

import { eventBus } from "infra/shared/dependencyInjection/eventStore/eventStore";
import Register from "infra/shared/dependencyInjection/eventListeners/registerListeners";

const commandResolver = new Application.CommandHandlerResolver();
const queryResolver =  new Application.QueryHandlerResolver();

queryResolver
    // User
    .addHandler(GetUserByUuidQuery, new GetUserByUuidHandler(getUser))
    // Property
    .addHandler(GetPropertyByUuidQuery, new GetPropertyByUuidHandler(getProperty))
    .addHandler(GetAllPropertiesQuery, new GetAllPropertiesHandler(getProperty))
;

commandResolver
    // User
    .addHandler(CreateUserCommand, new CreateUserHandler(getUser, userRepository))
    // Property
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

