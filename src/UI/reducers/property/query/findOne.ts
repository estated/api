import { GraphQLError } from 'graphql';

import GetPropertyByUuidQuery from "application/query/property/getByUuid/getPropertyByUuidQuery";

export default async (root, {uuid}, context) => {
    try {
        const res: any = await context.ask(new GetPropertyByUuidQuery(uuid));

        return res.data;
    } catch (err) {

        return new GraphQLError("Property not found")
    }
};
