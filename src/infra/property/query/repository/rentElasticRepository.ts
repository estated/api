import Elastic from "infra/shared/elastic/elastic";
import {SearchResponse} from "elasticsearch";
import PropertyView from "domain/property/query/PropertyView";
import RentView from "domain/property/query/RentView";
import GetRent from "domain/property/repository/query/getRent";

class RentElasticRepository implements GetRent{

    private readonly elasticCli: Elastic;

    constructor() {
        this.elasticCli = new Elastic();
    }

    async all(size: number = 25, from: number = 0): Promise<RentView[] | null> {
        const result: SearchResponse<PropertyView> =  await this.elasticCli.find(
            'rent',
            {
                match_all: {}
            },
            size,
            from
        );

        const results: any = result.hits.hits;

        return results.map(({ _source }) => (_source));
    }

    async byUuid(uuid: string): Promise<RentView|null> {
        const result: SearchResponse<RentView> =  await this.elasticCli.find(
            'rent',
            {
                term: {
                    uuid: uuid
                }
            },
            1
        );

        if (result.hits.total !== 0) {
            return <RentView>result.hits.hits[0]._source;
        }
    }

    async existsByUuid(uuid: string): Promise<boolean> {

        return await this.elasticCli.exists('property', uuid);
    }
}

export default RentElasticRepository;
