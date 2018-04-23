import { GraphQLError } from 'graphql';

import CreateUserCommand from "application/command/user/create/createUserCommand";

export default async (root, { uuid, email }, context) => {
    try {
        await context.handle(new CreateUserCommand(uuid, email));

        return 'ok';
    } catch (err) {

        return new GraphQLError(err.message)
    }
};