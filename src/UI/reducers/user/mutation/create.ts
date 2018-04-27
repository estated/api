import { GraphQLError } from 'graphql';

import CreateUserCommand from "application/command/user/create/createUserCommand";

export default async (root, { uuid, email, name, surname, identityId, phone, IBAN, salary}, context) => {
    try {
        await context.handle(new CreateUserCommand(uuid, email, name, surname, identityId, phone, IBAN, salary));

        return 'ok';
    } catch (err) {

        return new GraphQLError(err.message)
    }
};