import Price from "domain/shared/valueObject/price";
import {Domain} from "hollywood-js";

class PropertyWasRented extends Domain.DomainEvent {
    public readonly createdAt: Date;

    constructor(
        public readonly uuid: string,
        public readonly propertyUuid: string,
        public readonly ownerUuid: string,
        public readonly lesseeUuid: string,
        public readonly from: Date,
        public readonly to: Date,
        public readonly price: Price
    ) {
        super();
        this.createdAt = new Date();
    }
}

export default PropertyWasRented;