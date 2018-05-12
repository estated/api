import RentView from "domain/property/query/RentView";

export default interface GetRent {
    byUuid(uuid: string): Promise<RentView>
}
