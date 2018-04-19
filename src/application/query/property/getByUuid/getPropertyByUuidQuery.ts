import { Application } from 'hollywood-js'

class GetPropertyByUuidQuery implements Application.IQuery{
    constructor(public readonly uuid: string){}
}

export default GetPropertyByUuidQuery;