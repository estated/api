import { GraphQLError } from 'graphql';

import CreateUserCommand from "application/command/user/create/createUserCommand";

export default async (root, { uuid, email, name, surname, identityId }, context) => {
    try {
        console.log('RESOLVER', uuid, email, name, surname, identityId);
        await context.handle(new CreateUserCommand(uuid, email, name, surname, identityId));

        return 'ok';
    } catch (err) {

        return new GraphQLError(err.message)
    }
};