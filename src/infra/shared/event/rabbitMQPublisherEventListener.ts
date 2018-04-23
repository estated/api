import { Domain, EventStore } from 'hollywood-js';
import AMQCLi from '../messaging/client';
import {log} from "util";

export default class RabbitMQPublisherEventListener extends EventStore.EventListener {
    constructor(private readonly publisher: AMQCLi){
        super()
    }

    on(message: Domain.DomainMessage): void {
        const routing = 'domain' + RabbitMQPublisherEventListener.normalizeEventName(message.eventType);

        this.publisher.publish(
            'events',
            routing,
            JSON.stringify(message)
        ).catch(log);
    }

    /**
     * Converts UserWasCreated into user.was.created
     *
     * @param {string} eventType
     * @returns {string}
     */
    private static normalizeEventName(eventType: string): string {
        return eventType.replace(/\.?([A-Z])/g,  (x,y) => ("." + y.toLowerCase()).replace(/^_/, ""));
    }
}
