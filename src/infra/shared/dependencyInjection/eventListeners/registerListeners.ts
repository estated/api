import { EventStore } from 'hollywood-js';
import Broker from '../broker/rabbitmq'
import RabbitMQPublisherEventListener from 'infra/shared/event/rabbitMQPublisherEventListener';
import UserWasCreated from "domain/user/event/userWasCreated";
import PropertyProjection from "infra/property/query/projection/propertyProjection";
import PropertyRepositoryFactory from "infra/shared/dependencyInjection/repositories/propertyRepositoryFactory";
import PropertyWasCreated from "domain/property/event/propertyWasCreated";
import UserProjectionFactory from "infra/user/query/projection/userProjection";
import {userEventStore} from "infra/shared/dependencyInjection/eventStore/eventStore";
import PropertyContactRequestedByUser from "domain/property/event/propertyContactRequestedByUser";
import PropertyWasRented from "domain/property/event/rent/PropertyWasRented";
import RentProjection from "infra/property/query/projection/rentProjection";

const rentProjections = new RentProjection(PropertyRepositoryFactory);
const propertyProjections = new PropertyProjection(PropertyRepositoryFactory);
const userProjections = new UserProjectionFactory(userEventStore);

const Register = async (eventBus: EventStore.EventBus) => {
    await Broker.connect();

    eventBus
        .attach(UserWasCreated, userProjections)
        .attach(PropertyWasCreated, propertyProjections)
        .attach(PropertyContactRequestedByUser, propertyProjections)
        .attach(PropertyWasRented, propertyProjections)
        .attach(PropertyWasRented, rentProjections)
        .addListener(new RabbitMQPublisherEventListener(Broker))
    ;
};

export default Register;
