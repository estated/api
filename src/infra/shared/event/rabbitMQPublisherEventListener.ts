import { Domain, EventStore } from 'hollywood-js';
import AMQCLi from '../messaging/client';
import {log} from "util";

export default class RabbitMQPublisherEventListener extends EventStore.EventListener {
    constructor(private readonly publisher: AMQCLi){
        super()
    }

    on(event: Domain.DomainEvent): void {
        const routing = 'domain' + RabbitMQPublisherEventListener.normalizeEventName(event);

        this.publisher.publish(
            'events',
            routing,
            JSON.stringify(event)
        ).catch(log);
        
        log(routing)
    }

    /**
     * Converts UserWasCreated into user.was.created
     * @param {DomainEvent} event
     * @returns {string}
     */
    private static normalizeEventName(event: Domain.DomainEvent): string {
        return event.constructor.name.replace(/\.?([A-Z])/g,  (x,y) => ("." + y.toLowerCase()).replace(/^_/, ""));
    }
}
