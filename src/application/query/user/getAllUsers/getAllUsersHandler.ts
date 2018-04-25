import {Application} from "hollywood-js";
import GetAll from "domain/user/repository/query/getAll";
import GetAllUsersQuery from "application/query/user/getAllUsers/getAllUsersQuery";

class GetAllUsersHandler implements Application.IQueryHandler {
    constructor(private readonly readModel: GetAll) {}

    async handle(request: GetAllUsersQuery): Promise<Application.IAppResponse | Application.IAppError> {
        return <Application.IAppResponse>{
            data: await this.readModel.all(
                request.size,
                ((request.page -1) * request.size),
                request.query
            )
        };
    }
}

export default GetAllUsersHandler