import { Application } from 'hollywood-js';
import Geo from 'domain/property/valueObject/geo';
import Price from 'domain/property/valueObject/price';

export default class CreatePropertyCommand implements Application.ICommand {

    public readonly geo: Geo;
    public readonly price: Price;

    constructor(
        public readonly uuid: string,
        public readonly title: string,
        public readonly description: string,
        public readonly type: number,
        lat: number,
        lon: number,
        priceAmount: number,
        currency: string
    ) {
        this.geo = Geo.create(lat, lon);
        this.price = new Price(priceAmount, currency);
    }
}