import { Application, Domain } from 'hollywood-js';
import Property from 'domain/property/model/property';
import CreatePropertyCommand from './createPropertyCommand';

export default class CreatePropertyHandler implements Application.ICommandHandler {
    constructor(private readonly propertyStore: Domain.IRepository<Property>) {}

    async handle(command: CreatePropertyCommand): Promise<void | Application.IAppError> {
        const property = Property.create(
            command.uuid,
            command.title, 
            command.description, 
            command.type, 
            command.geo, 
            command.price
        );

        await this.propertyStore.save(property);
    }
}