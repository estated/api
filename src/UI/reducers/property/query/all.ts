import { GraphQLError } from 'graphql';

import GetAllPropertiesQuery from "application/query/property/getAllProperties/getAllPropertiesQuery";

export default async (root, {size, page}, context) => {
    try {
        const res: any = await context.ask(new GetAllPropertiesQuery(size, page));

        return res.data;
    } catch (err) {

        return new GraphQLError(err.message)
    }
};
