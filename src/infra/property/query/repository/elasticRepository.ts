import Elastic from "infra/shared/elastic/elastic";
import {SearchResponse} from "elasticsearch";
import PropertyView from "domain/property/query/PropertyView";
import GetProperty from "domain/property/repository/query/getProperty";
import GetAllProperties from "domain/property/repository/query/getAllProperties";
import CheckLessee from "domain/property/repository/query/checkLessee";

class PropertyElasticRepository implements GetProperty, GetAllProperties, CheckLessee {

    private readonly elasticCli: Elastic;

    constructor() {
        this.elasticCli = new Elastic();
    }

    async all(size: number = 25, from: number = 0): Promise<PropertyView[] | null> {
        const result: SearchResponse<PropertyView> =  await this.elasticCli.find(
            'property',
            {
                match_all: {}
            },
            size,
            from
        );

        const results: any = result.hits.hits;

        return results.map(({ _source }) => (_source as PropertyView));
    }

    async byUuid(uuid: string): Promise<PropertyView|null> {
        const result: SearchResponse<PropertyView> =  await this.elasticCli.find(
            'property',
            {
                term: {
                    uuid: uuid
                }
            },
            1
        );

        if (result.hits.total !== 0) {
            return <PropertyView>result.hits.hits[0]._source;
        }

        return null;
    }

    async existsByUuid(uuid: string): Promise<boolean> {

        return await this.elasticCli.exists('property', uuid);
    }

    async byTitle(email: string): Promise<PropertyView|null> {
        const result: SearchResponse<PropertyView> =  await this.elasticCli.find(
            'property',
            {
                term: {
                    email: email
                }
            },
            1
        );

        if (result.hits.total !== 0) {
            return <PropertyView>result.hits.hits[0]._source;
        }

        return null;
    }


    async exists(lesseeUuid: string): Promise<boolean> {
        return await this.elasticCli.exists('user', lesseeUuid);
    }
}

export default PropertyElasticRepository;
