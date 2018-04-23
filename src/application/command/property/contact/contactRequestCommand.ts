import { Application } from "hollywood-js";

class ContactRequestCommand implements Application.IQuery{
    constructor(
        public readonly propertyUuid: string,
        public readonly userUuid: string,
        public readonly email: string
    ) {}
}

export default ContactRequestCommand;
