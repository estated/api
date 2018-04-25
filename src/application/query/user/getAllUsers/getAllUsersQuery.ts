import {Application} from "hollywood-js";

class GetAllUsersQuery implements Application.IQuery {
    constructor(
        public readonly size: number = 25,
        public readonly page: number = 1,
        public readonly query: string|null = null
    ) {}
}

export default GetAllUsersQuery;
