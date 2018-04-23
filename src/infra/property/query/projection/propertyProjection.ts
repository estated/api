import { log } from "util";
import { EventStore } from "hollywood-js";
import Elastic from "infra/shared/elastic/elastic";
import PropertyView from "domain/property/query/PropertyView";
import Property from "domain/property/model/property";
import WriteRepository from "domain/shared/error/repository/write";
import PropertyWasCreated from "domain/property/event/propertyWasCreated";
import PropertyContactRequestedByUser from "domain/property/event/propertyContactRequestedByUser";

class PropertyProjection extends EventStore.EventSubscriber {
    private readonly elastic: Elastic;
    private readonly repo: WriteRepository<Property>;

    constructor(repo: WriteRepository<Property>) {
        super();
        this.elastic = new Elastic('info');
        this.repo = repo;
    }

    private async onPropertyWasCreated(event: PropertyWasCreated): Promise<void> {
        const property: Property = await this.repo.load(event.uuid);

        this.elastic.add('property', event.uuid, PropertyProjection.view(property)).catch(log);
    }

    private async onPropertyContactRequestedByUser(event: PropertyContactRequestedByUser): Promise<void> {
        this.elastic.patch('property', event.propertyId, {
            "script" : "ctx._source.contacts+=1",
            "upsert": {
                "contacts": 1
            }
        }).catch(log);
    }

    private static view(property: Property | any): PropertyView {
        delete property['methodPrefix'];
        delete property['events'];
        delete property['playhead'];

        return <PropertyView>property;
    }
}

export default PropertyProjection;
