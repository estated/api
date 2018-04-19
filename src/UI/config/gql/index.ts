import schema from './schema'
import resolvers from './resolvers'
import { makeExecutableSchema } from "graphql-tools";

export default () => {
    return makeExecutableSchema({
        typeDefs: schema,
        resolvers: resolvers
    });
}