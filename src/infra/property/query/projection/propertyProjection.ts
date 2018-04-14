import Elastic from "infra/shared/elastic/elastic";
import PropertyView from "domain/property/query/PropertyView";
import Property from "domain/property/model/property";
import WriteRepository from "domain/shared/error/repository/write";
import {log} from "util";

class PropertyProjection {
    private readonly elastic: Elastic;
    private readonly repo: WriteRepository<Property>;

    constructor(repo: WriteRepository<Property>) {
        this.elastic = new Elastic();
        this.repo = repo;
    }

    async generateProjection(uuid: string): Promise<void> {
        const property: any = await this.repo.load(uuid);

        this.elastic.add('property', uuid, PropertyProjection.view(property)).catch(log);
    }

    private static view(property: Property | any): PropertyView {
        delete property['methodPrefix'];
        delete property['events'];

        return <PropertyView>property;
    }
}

export default PropertyProjection;
