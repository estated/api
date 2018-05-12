import {Application} from "hollywood-js";
import RentPropertyCommand from "application/command/property/rentProperty/rentPropertyCommand";
import WriteRepository from "domain/shared/error/repository/write";
import CheckLessee from "domain/property/repository/query/checkLessee";
import Property from "domain/property/model/property";

class RentPropertyHandler implements Application.ICommandHandler {

    constructor(
        private readonly store: WriteRepository<Property>,
        private readonly lesseeExistRepository: CheckLessee,
    ) {
    }

    async handle(command: RentPropertyCommand): Promise<void | Application.IAppError> {

        const property: Property = await this.store.load(command.propertyUuid);

        if (!this.checkUser(command.lesseeUuid)) {

            return <Application.IAppError> {
                code: 400,
                message: 'User not found'
            }
        }

        property.rent(
            command.uuid,
            command.lesseeUuid,
            command.from,
            command.to,
            command.price
        );

        await this.store.save(property);
    }

    private async checkUser(lesseeUuid: string): Promise<boolean> {
        return await this.lesseeExistRepository.exists(lesseeUuid);
    }
}

export default RentPropertyHandler;
