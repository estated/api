import PropertyView from "domain/property/query/PropertyView";

export default interface GetProperty {
    byUuid(uuid: string): Promise<PropertyView|null>;
}
