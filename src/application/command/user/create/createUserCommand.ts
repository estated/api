import { Application } from 'hollywood-js'
import Email from 'domain/user/valueObject/email';

export default class CreateUserCommand implements Application.ICommand {
    public readonly email: Email;
    constructor(
        public uuid: string,
        email: string,
        public name: string,
        public surname: string,
        public identity: string,
        public phone: string,
        public IBAN: string,
        public salary: number | null
    ){
        this.email = Email.fromString(email);
    }
}
