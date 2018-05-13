import { Application } from 'hollywood-js'

class GetRentsQuery implements Application.IQuery{

    constructor(
        public readonly from: number,
        public readonly to: number,
    ) {
    }
}

export default GetRentsQuery;