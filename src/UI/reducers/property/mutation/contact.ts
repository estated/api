import { GraphQLError } from 'graphql';

import ContactRequestCommand from "application/command/property/contact/contactRequestCommand";

export default async (root, { propertyUuid, userUuid, email }, context) => {
    try {
        await context.handle(new ContactRequestCommand(
            propertyUuid,
            userUuid,
            email
        ));

        return 'ok';
    } catch (err) {

        return new GraphQLError(err.message)
    }
}