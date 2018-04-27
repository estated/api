import { Domain } from 'hollywood-js'
import UserWasCreated from '../event/userWasCreated';
import Email, { EmailType } from '../valueObject/email';

export default class User extends Domain.EventSourced {
    uuid: string;
    email: EmailType;
    name: string;
    surname: string;
    identityId: string;
    createdAt: Date;
    phone: string;
    IBAN: string;
    salary: number;

    getAggregateRootId(): string {
        return this.uuid
    }

    static create(
        uuid: string,
        email: Email,
        name: string,
        surname: string,
        identityId: string,
        phone: string,
        IBAN: string,
        salary: number | null
    ): User {
        const instance = new User();

        instance.raise(new UserWasCreated(
            uuid,
            email.value,
            name,
            surname,
            identityId,
            phone,
            IBAN,
            salary
        ));

        return instance;
    }

    protected applyUserWasCreated(event: UserWasCreated): void {
        this.uuid = event.uuid;
        this.email = event.email;
        this.createdAt = event.ocurrendOn;
        this.identityId = event.identityId;
        this.name = event.name;
        this.surname = event.surname;
        this.phone = event.phone;
        this.IBAN = event.IBAN;
        this.salary = event.salary;
    }
}