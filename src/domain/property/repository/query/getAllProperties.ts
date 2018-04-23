import PropertyView from "domain/property/query/PropertyView";

export default interface GetAllProperties {
    all(size: number, from: number): Promise<PropertyView[]|null>;
}
