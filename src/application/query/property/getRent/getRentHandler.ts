import { Application } from "hollywood-js"
import GetRent from "domain/property/repository/query/getRent";
import GetRentQuery from "application/query/property/getRent/getRentQuery";

class GetRentHandler implements Application.IQueryHandler {

    constructor(
        private readonly repository: GetRent
    ) {}

    async handle(request: GetRentQuery): Promise<Application.IAppResponse | Application.IAppError> {
        return <Application.IAppResponse>{
            data: await this.repository.byUuid(request.uuid)
        };
    }
}

export default GetRentHandler;