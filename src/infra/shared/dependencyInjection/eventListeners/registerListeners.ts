import { EventStore } from 'hollywood-js';
import Broker from '../broker/rabbitmq'
import RabbitMQPublisherEventListener from 'infra/shared/event/rabbitMQPublisherEventListener';
import UserSubscriber from "infra/user/query/subscriber/userSubscriber";
import UserWasCreated from "domain/user/event/userWasCreated";
import PropertyWasCreated from "domain/property/event/propertyWasCreated";
import PropertySubscriber from "infra/property/query/subscriber/propertySubscriber";

const Register = async (eventBus: EventStore.EventBus) => {
    await Broker.connect();
    eventBus
        .attach(UserWasCreated, new UserSubscriber(Broker))
        .attach(PropertyWasCreated, new PropertySubscriber(Broker))
        .addListener(new RabbitMQPublisherEventListener(Broker))
    ;
};

export default Register;