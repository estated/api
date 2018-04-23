import { GraphQLError } from 'graphql';
import GetUserByUuidQuery from "application/query/user/getByUuid/getUserByUuidQuery";
import CreateUserCommand from "application/command/user/create/createUserCommand";
import GetPropertyByUuidQuery from "application/query/property/getByUuid/getPropertyByUuidQuery";
import CreatePropertyCommand from "application/command/property/create/createPropertyCommand";
import GetAllPropertiesQuery from "application/query/property/getAllProperties/getAllPropertiesQuery";
import ContactRequestCommand from "application/command/property/contact/contactRequestCommand";
import GetAllUsersQuery from "application/query/user/getAllUsers/getAllUsersQuery";

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
        users: async (root, {page, size}, context) => {
            try {
                const res: any = await context.ask(new GetAllUsersQuery(size || 25, page || 1));

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
        properties: async (root, {size, page}, context) => {
            try {
                const res: any = await context.ask(new GetAllPropertiesQuery(size, page));

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
        },
        contactRequest: async (root, { propertyUuid, userUuid, email }, context) => {
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
    }
};

export default resolvers;
