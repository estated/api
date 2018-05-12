import { log } from "util";
import { EventStore, Domain } from "hollywood-js";
import Elastic from "infra/shared/elastic/elastic";
import Property from "domain/property/model/property";
import WriteRepository from "domain/shared/error/repository/write";
import PropertyWasRented from "domain/property/event/rent/PropertyWasRented";

class RentProjection extends EventStore.EventSubscriber {
    private readonly elastic: Elastic;
    private readonly repo: WriteRepository<Property>;

    constructor(repo: WriteRepository<Property>) {
        super();
        this.elastic = new Elastic('info');
        this.repo = repo;
    }

    private async onPropertyWasRented(event: PropertyWasRented): Promise<void> {
        const property: Property = await this.repo.load(event.propertyUuid);

        this.elastic.add('rent', event.uuid, RentProjection.view(property.currentRent)).catch(log);
    }


    private static view(entity: Domain.EventSourced | any): any {
        delete entity['methodPrefix'];
        delete entity['events'];
        delete entity['aggregates'];

        return entity;
    }
}

export default RentProjection;
