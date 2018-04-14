import { Domain } from 'hollywood-js';
import Geo from '../valueObject/geo';
import Price from '../valueObject/price';

export default class PropertyWasCreated extends Domain.DomainEvent {
    constructor(
        public readonly uuid: string,
        public readonly title: string,
        public readonly description: string,
        public readonly type: number,
        public readonly geo: Geo,
        public readonly price: Price
    ) {
        super()
    }
}
