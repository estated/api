import { Domain } from 'hollywood-js';
import Geo from '../valueObject/geo';
import PropertyWasCreated from '../event/propertyWasCreated';
import PropertyContactRequestedByUser from "domain/property/event/propertyContactRequestedByUser";
import Price from "domain/shared/valueObject/price";
import PropertyWasRented from "domain/property/event/rent/PropertyWasRented";
import Rent from "domain/property/model/rent";

type PropertyType = number;

const TYPES_TO_STRING = {
    1: 'rent',
    2: 'sale'
};

class Property extends Domain.EventSourced {

    private uuid: string;
    private title: string;
    private description: string;
    private ownerUuid: string | null;
    private contacts: number = 0;
    private type: PropertyType;
    private createdAt: Date;
    private geo: Geo;
    private price: Price;
    private currentRentUuid: string | null;
    public currentRent: Rent;

    constructor() {
        super();
        this.registerChild(new Rent());
    }

    public static create(uuid: string, title: string, description: string, type: PropertyType, geo: Geo, price: Price, ownerUuid: string | null): Property {
        const instance = new Property();

        instance.raise(new PropertyWasCreated(uuid, title, description, type, geo, price, ownerUuid));

        return instance;
    }

    public contactRequest(userUuid: string, email: string): void {
        this.raise(new PropertyContactRequestedByUser(this.getAggregateRootId(), userUuid, email))
    }

    public rent(
        uuid: string,
        lesseeUuid: string,
        from: Date,
        to: Date,
        price: Price
    ): void {
        this.raise(
            new PropertyWasRented(
                uuid,
                this.uuid,
                this.ownerUuid,
                lesseeUuid,
                from,
                to,
                price
            )
        );
    }

    public getAggregateRootId(): string {

        return this.uuid;
    }

    public typeAsString(): string {
        return TYPES_TO_STRING[this.type];
    }

    private applyPropertyWasCreated(event: PropertyWasCreated): void {
        this.uuid = event.uuid;
        this.title = event.title;
        this.description = event.description;
        this.ownerUuid = event.ownerUuid;
        this.type = event.type;
        this.geo = event.geo;
        this.price = event.price;
        this.createdAt = event.createdAt;
    }

    private applyPropertyContactRequestedByUser(event: PropertyContactRequestedByUser): void {
        this.contacts++;
    }

    private applyPropertyWasRented(event: PropertyWasRented): void {
        this.currentRentUuid = event.uuid;
        this.currentRent = <Rent> this.aggregates[0];
    }
}

export default Property;
