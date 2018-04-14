import Elastic from "infra/shared/elastic/elastic";
import {SearchResponse} from "elasticsearch";
import PropertyView from "domain/property/query/PropertyView";
import GetProperty from "domain/property/repository/query/getProperty";

class PropertyElasticRepository implements GetProperty {
    private readonly elasticCli: Elastic;

    constructor() {
        this.elasticCli = new Elastic();
    }

    async byUuid(uuid: string): Promise<PropertyView|null> {
        const result: SearchResponse<PropertyView> =  await this.elasticCli.find(
            'proeprty',
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
