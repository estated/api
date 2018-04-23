import { GraphQLError } from 'graphql'
import GetUserByUuidQuery from "application/query/user/getByUuid/getUserByUuidQuery";

export default async (root, {uuid}, context) => {
    try {
        const res: any = await context.ask(new GetUserByUuidQuery(uuid));

        return res.data;
    } catch (err) {

        return new GraphQLError("User not found")
    }
};
