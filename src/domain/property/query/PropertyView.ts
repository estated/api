import Geo from "domain/property/valueObject/geo";
import Price from "domain/shared/valueObject/price";

export default interface PropertyView {
    uuid: string;
    title: string;
    description: string;
    type: number;
    createdAt: Date;
    geo: Geo;
    price: Price;
    contacts: number;
    ownerUuid: string | null;
    currentRentUuid: string | null;
}
