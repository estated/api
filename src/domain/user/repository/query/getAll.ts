import UserView from "domain/user/query/UserView";

export default interface GetAll {
    all(size: number, from: number, query: string|null): Promise<UserView[]>;
}