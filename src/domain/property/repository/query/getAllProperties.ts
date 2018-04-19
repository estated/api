import PropertyView from "domain/property/query/PropertyView";

export default interface GetAllProperties {
    all(options): Promise<PropertyView[]|null>;
}
