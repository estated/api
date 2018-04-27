import { Domain } from 'hollywood-js';
import { EmailType } from "domain/user/valueObject/email";

export default class UserWasCreated extends Domain.DomainEvent {
    constructor(
        public uuid: string,
        public email: EmailType,
        public name: string,
        public surname: string,
        public identityId: string,
        public phone: string,
        public IBAN: string | null,
        public salary: number | null
    ) {
        super();
    }
}
