import { EventStore } from 'hollywood-js'
import AMQCLi from "infra/shared/messaging/client";
import {Domain} from "hollywood-js/index";

class PropertySubscriber extends EventStore.EventSubscriber {
    constructor(private readonly publisher: AMQCLi){
        super()
    }

    onPropertyWasCreated(event: Domain.DomainEvent): void {
        console.log('PUBLISH');
        this.publisher.publish('events', 'property', JSON.stringify(event));
    }
}

export default PropertySubscriber