import { GraphQLError } from 'graphql';

import GetUserByUuidQuery from "application/query/user/getByUuid/getUserByUuidQuery";
import CreateUserCommand from "application/command/user/create/createUserCommand";
import GetPropertyByUuidQuery from "application/query/property/getByUuid/getPropertyByUuidQuery";
import CreatePropertyCommand from "application/command/property/create/createPropertyCommand";
import GetAllPropertiesQuery from "application/query/property/getAllProperties/getAllPropertiesQuery";

const resolvers = {
    Query: {
        user: async (root, {uuid}, context) => {
            try {
                const res: any = await context.ask(new GetUserByUuidQuery(uuid));

                return res.data;
            } catch (err) {

                return new GraphQLError("User not found")
            }
        },
        property: async (root, {uuid}, context) => {
            try {
                const res: any = await context.ask(new GetPropertyByUuidQuery(uuid));

                return res.data;
            } catch (err) {

                return new GraphQLError("Property not found")
            }
        },
        properties: async (root, {}, context) => {
            try {
                const res: any = await context.ask(new GetAllPropertiesQuery());

                return res.data;
            } catch (err) {

                return new GraphQLError(err.message)
            }
        },
    },
    Mutation: {
        createUser: async (root, { uuid, email }, context) => {
            try {
                await context.handle(new CreateUserCommand(uuid, email));
                return 'ok';
            } catch (err) {

                return new GraphQLError(err.message)
            }
        },
        createProperty: async (
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
        }
    }
};

export default resolvers;