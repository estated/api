import { Domain } from 'hollywood-js';

export default class PropertyContactRequestedByUser extends Domain.DomainEvent {
    constructor(
        public readonly propertyId: string,
        public readonly userId: string,
        public readonly email: string
    ) {
        super()
    }
}