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

import ContactRequestHandler from "application/command/property/contact/contactRequestHandler";
import ContactRequestCommand from "application/command/property/contact/contactRequestCommand";

import userRepository, { getUser } from "infra/shared/dependencyInjection/repositories/userRepositoryFactory";
import propertyWriteRepository, {
    getProperty,
    getRent
} from "infra/shared/dependencyInjection/repositories/propertyRepositoryFactory";

import {eventBus} from "infra/shared/dependencyInjection/eventStore/eventStore";
import Register from "infra/shared/dependencyInjection/eventListeners/registerListeners";
import GetAllUsersHandler from "application/query/user/getAllUsers/getAllUsersHandler";
import GetAllUsersCommand from "application/query/user/getAllUsers/getAllUsersQuery";
import GetRentQuery from "application/query/property/getRent/getRentQuery";
import GetRentHandler from "application/query/property/getRent/getRentHandler";
import RentPropertyCommand from "application/command/property/rentProperty/rentPropertyCommand";
import RentPropertyHandler from "application/command/property/rentProperty/rentPropertyHandler";


const commandResolver = new Application.CommandHandlerResolver();
const queryResolver =  new Application.QueryHandlerResolver();

queryResolver
    // User
    .addHandler(GetUserByUuidQuery, new GetUserByUuidHandler(getUser))
    .addHandler(GetAllUsersCommand, new GetAllUsersHandler(getUser))
    // Property
    .addHandler(GetPropertyByUuidQuery, new GetPropertyByUuidHandler(getProperty))
    .addHandler(GetAllPropertiesQuery, new GetAllPropertiesHandler(getProperty))
    .addHandler(GetRentQuery, new GetRentHandler(getRent))
;

commandResolver
    // User
    .addHandler(CreateUserCommand, new CreateUserHandler(getUser, userRepository))
    // Property
    .addHandler(CreatePropertyCommand, new CreatePropertyHandler(propertyWriteRepository, getProperty))
    .addHandler(ContactRequestCommand, new ContactRequestHandler(propertyWriteRepository))
    .addHandler(RentPropertyCommand, new RentPropertyHandler(propertyWriteRepository, getProperty))
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
