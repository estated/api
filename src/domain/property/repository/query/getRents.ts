import RentView from "domain/property/query/RentView";

export default interface GetRents {
    all(from: number, to: number): Promise<RentView[]>
}
