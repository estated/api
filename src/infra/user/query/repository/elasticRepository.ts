import Elastic from "infra/shared/elastic/elastic";
import GetUser from "domain/user/repository/query/getUser";
import UserView from "domain/user/query/UserView";
import {EmailType} from "domain/user/valueObject/email";
import {SearchResponse} from "elasticsearch";
import GetAll from "domain/user/repository/query/getAll";

export default class UserElasticRepository implements GetUser, GetAll {
    private readonly elasticCli: Elastic;

    constructor() {
        this.elasticCli = new Elastic();
    }

    async getUserByUuid(uuid: string): Promise<UserView|null> {
        const result: SearchResponse<UserView> =  await this.elasticCli.find(
            'user',
            {
                term: {
                    uuid: uuid
                }
            },
            1
        );

        if (result.hits.total !== 0) {
            return <UserView>result.hits.hits[0]._source;
        }

        return null;
    }

    async getUserByIdentity(identity: string): Promise<UserView|null> {
        const result: SearchResponse<UserView> =  await this.elasticCli.find(
            'user',
            {
                term: {
                    identityId: identity
                }
            },
            1
        );

        if (result.hits.total > 0) {
            return <UserView>result.hits.hits[0]._source;
        }

        return null;
    }

    async getUserByEmail(email: EmailType): Promise<UserView|null> {
        const result: SearchResponse<UserView> =  await this.elasticCli.find(
            'user',
            {
                term: {
                    email: email
                }
            },
            1
        );

        if (result.hits.total > 0) {
            return <UserView>result.hits.hits[0]._source;
        }

        return null;
    }

    async all(size: number = 25, from: number = 0): Promise<UserView[]> {

        console.log(size, from);

        const result: SearchResponse<UserView> =  await this.elasticCli.find(
            'user',
            {
                match_all: {}
            },
            size,
            from
        );

        const results: any = result.hits.hits;

        return results.map(({ _source }) => (_source as UserView));
    }
}
