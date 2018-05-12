import {Application} from "hollywood-js";
import Price from "domain/shared/valueObject/price";

class RentPropertyCommand implements Application.ICommand {
    constructor(
        public readonly uuid: string,
        public readonly propertyUuid: string,
        public readonly lesseeUuid: string,
        public readonly from: Date,
        public readonly to: Date,
        public readonly price: Price
    ) {}
}

export default RentPropertyCommand;