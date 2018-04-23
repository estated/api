import { Application } from 'hollywood-js';
import Property from 'domain/property/model/property';
import CreatePropertyCommand from './createPropertyCommand';
import WriteRepository from "domain/shared/error/repository/write";
import GetProperty from "domain/property/repository/query/getProperty";

export default class CreatePropertyHandler implements Application.ICommandHandler {
    constructor(
        private readonly propertyStore: WriteRepository<Property>,
        private readonly propertyReadModel: GetProperty
    ) {}

    async handle(command: CreatePropertyCommand): Promise<void | Application.IAppError> {
        await this.validateUuidAndTitle(command.uuid, command.title);

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

    private async validateUuidAndTitle(uuid: string, title: string): Promise<void> {
        const exist = await this.propertyReadModel.byUuid(uuid) || await this.propertyReadModel.byTitle(title);
        if (exist) {
            throw <Application.IAppError>{
                message: 'Already Exist',
                code: 409
            };
        }
    }
}