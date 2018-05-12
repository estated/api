import { GraphQLError } from 'graphql';

import RentPropertyCommand from "application/command/property/rentProperty/rentPropertyCommand";
import Price from "domain/shared/valueObject/price";

export default async (root, { uuid, propertyUuid, lesseeUuid, startAt, endAt, priceAmount, currency}, context) => {
    try {
        await context.handle(new RentPropertyCommand(
            uuid,
            propertyUuid,
            lesseeUuid,
            new Date(startAt),
            new Date(endAt),
            new Price(priceAmount, currency)
        ));

        return 'ok';
    } catch (err) {

        return new GraphQLError(err.message)
    }
}