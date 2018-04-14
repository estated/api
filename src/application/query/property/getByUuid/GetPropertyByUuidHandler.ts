import { Application } from 'hollywood-js'
import PropertyElasticRepository from "infra/property/query/repository/elasticRepository";

class GetPropertyByUuidHandler implements Application.IQueryHandler{
    constructor(private readonly repo: PropertyElasticRepository){}

    async handle(): Promise<Application.IAppResponse|Application.IAppError> {
        return <Application.IAppResponse>{
            data: await this.repo.byUuid('')
        };
    }
}

export default GetPropertyByUuidHandler;