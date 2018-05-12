import {Domain} from "hollywood-js";
import PropertyWasRented from "domain/property/event/rent/PropertyWasRented";
import Price from "domain/shared/valueObject/price";

export type Period = {
    startAt: Date,
    endAt: Date,
}

class Rent extends Domain.EventSourced {
    private uuid: string;
    public propertyUuid: string;
    public ownerUuid: string;
    public lesseeUuid: string;
    public period: Period;
    public price: Price;

    protected applyPropertyWasRented(
        event: PropertyWasRented
    ): void {
        this.uuid = event.uuid;
        this.propertyUuid = event.propertyUuid;
        this.ownerUuid = event.ownerUuid;
        this.lesseeUuid = event.lesseeUuid;
        this.period = {
            startAt: event.from,
            endAt: event.to
        };
        this.price = event.price;
    }

    public getAggregateRootId(): string {

        return this.uuid;
    }
}

export default Rent