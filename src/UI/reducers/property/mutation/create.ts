import { GraphQLError } from 'graphql';

import CreatePropertyCommand from "application/command/property/create/createPropertyCommand";

export default async (
    root,
    {
        uuid,
        title,
        description,
        type,
        lat,
        lon,
        priceAmount,
        currency
    },
    context) => {
        try {
            await context.handle(new CreatePropertyCommand(
                uuid,
                title,
                description,
                type,
                lat,
                lon,
                priceAmount,
                currency
            ));
    
            return 'ok';
        } catch (err) {
    
            return new GraphQLError(err.message)
        }
};