import PropertyView from "domain/property/query/PropertyView";

export default interface GetProperty {
    existsByUuid(uuid: string): Promise<boolean>;
    byUuid(uuid: string): Promise<PropertyView|null>;
    byTitle(title: string): Promise<PropertyView|null>;
}
