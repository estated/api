import { Application } from 'hollywood-js'
import GetProperty from "domain/property/repository/query/getProperty";
import GetPropertyByUuidQuery from "application/query/property/getByUuid/getPropertyByUuidQuery";

class GetPropertyByUuidHandler implements Application.IQueryHandler{
    constructor(private readonly repo: GetProperty){}

    async handle(query: GetPropertyByUuidQuery): Promise<Application.IAppResponse|Application.IAppError> {
        return <Application.IAppResponse>{
            data: await this.repo.byUuid(query.uuid)
        };
    }
}

export default GetPropertyByUuidHandler;