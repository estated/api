import { Application } from "hollywood-js"

class GetRentQuery implements Application.IQuery {
    constructor(
        public readonly uuid
    ) {}
}

export default GetRentQuery;