import Price from "domain/shared/valueObject/price";
import {Period} from "domain/property/model/rent";

export default interface RentView {
    uuid: string;
    propertyUuid: string;
    ownerUuid: string;
    lesseeUuid: string;
    period: Period;
    price: Price;
}
