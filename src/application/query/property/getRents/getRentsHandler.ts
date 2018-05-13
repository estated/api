import { Application } from 'hollywood-js'
import GetRentsQuery from "application/query/property/getRents/getRentsQuery";
import GetRents from "domain/property/repository/query/getRents";

class GetRentsHandler implements Application.IQueryHandler{

    constructor(private readonly readModel: GetRents) {}

    async handle(request: GetRentsQuery): Promise<Application.IAppResponse | Application.IAppError> {
        return <Application.IAppResponse> {
            data: await this.readModel.all(request.from, request.to)
        };
    }
}

export default GetRentsHandler;