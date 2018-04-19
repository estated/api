import Elastic from "infra/shared/elastic/elastic";
import {SearchResponse} from "elasticsearch";
import PropertyView from "domain/property/query/PropertyView";
import GetProperty from "domain/property/repository/query/getProperty";
import GetAllProperties from "domain/property/repository/query/getAllProperties";

class PropertyElasticRepository implements GetProperty, GetAllProperties {

    private readonly elasticCli: Elastic;

    constructor() {
        this.elasticCli = new Elastic();
    }

    async all(options): Promise<PropertyView[] | null> {
        const result: SearchResponse<PropertyView> =  await this.elasticCli.find(
            'property',
            {
            },
            options.size || 25,
            options.from || 0,
            {
                sort: [
                    {
                        "createdAt" : {
                            "order" : "asc"
                        }
                    }
                ]
            }
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
}

export default PropertyElasticRepository;
