import { Application } from 'hollywood-js'
import WriteRepository from "domain/shared/error/repository/write";
import Property from "domain/property/model/property";
import ContactRequestCommand from "application/command/property/contact/contactRequestCommand";
import {log} from "util";

class ContactRequestHandler implements Application.ICommandHandler{
    constructor(private readonly store: WriteRepository<Property>) {}

    async handle(event: ContactRequestCommand): Promise<void> {
        const property: Property = await this.store.load(event.propertyUuid);
        
        property.contactRequest(event.userUuid, event.email);

        await this.store.save(property).catch(log);
    }
}

export default ContactRequestHandler;
