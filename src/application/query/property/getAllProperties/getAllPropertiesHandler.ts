import { Application } from "hollywood-js"
import GetAllProperties from "domain/property/repository/query/getAllProperties";
import GetAllPropertiesQuery from "application/query/property/getAllProperties/getAllPropertiesQuery";

class GetAllPropertiesHandler implements Application.IQueryHandler {
    constructor(private readonly repo: GetAllProperties) {}

    async handle(query: GetAllPropertiesQuery): Promise<Application.IAppResponse|Application.IAppError> {

        return <Application.IAppResponse>{
            data: await this.repo.all(query.size, ((query.page -1) * query.size))
        };
    }
}

export default GetAllPropertiesHandler;