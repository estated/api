import { EventStore } from 'hollywood-js';
import RedisStore from "infra/shared/store/redisStore";
import User from "domain/user/model/user";
import RedisSnapshot from "infra/shared/store/redisSnapshot";
import Property from "domain/property/model/property";

const eventBus = new EventStore.EventBus();
const eventStoreDbal = new RedisStore('user');
const snapshotDbal = new RedisSnapshot('user');
const propertyEventStoreDbal = new RedisStore('property');
const propertySnapshotDbal = new RedisSnapshot('property');
const userEventStore = new EventStore.EventStore(User, eventStoreDbal, eventBus, snapshotDbal);
const propertyEventStore = new EventStore.EventStore(Property, propertyEventStoreDbal, eventBus, propertySnapshotDbal);

export {
    userEventStore,
    propertyEventStore,
    eventBus
}