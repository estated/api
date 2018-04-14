import { Domain } from 'hollywood-js';
import Geo from '../valueObject/geo';
import Price from '../valueObject/price';
import PropertyWasCreated from '../event/propertyWasCreated';
import UserAskedForContact from '../event/userAskedForContact';

type PropertyType = number;

const TYPES_TO_STRING = {
    1: 'rent',
    2: 'sale'
};

class Property extends Domain.EventSourced {

    private uuid: string;
    private title: string;
    private description: string;
    private type: PropertyType;
    private createdAt: Date;
    private contactsCount: number = 0;
    private geo: Geo;
    private price: Price;

    public static create(uuid: string, title: string, description: string, type: PropertyType, geo: Geo, price: Price): Property {
        const instance = new Property();

        instance.raise(new PropertyWasCreated(uuid, title, description, type, geo, price));

        return instance;
    }

    public getAggregateRootId(): string {

        return this.uuid;
    }

    public contact(userId: string, email: string): void {
        this.raise(new UserAskedForContact(this.uuid, userId, email));
    }


    public typeAsString(): string {
        return TYPES_TO_STRING[this.type];
    }

    private applyPropertyWasCreated(event: PropertyWasCreated): void {
        this.uuid = event.uuid;
        this.title = event.title;
        this.description = event.description;
        this.type = event.type;
        this.geo = event.geo;
        this.price = event.price;
        this.createdAt = event.ocurrendOn
    }

    private applyUserAskForContact(event: UserAskedForContact): void {
        this.contactsCount++
    }
}

export default Property;
