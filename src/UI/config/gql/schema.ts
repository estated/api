import Property from "./schema/property/property";
import User from "./schema/user/user";

const RootMutation: string = `
    type Mutation {
      
      createUser(
        uuid: String!, 
        email: String!,
        name: String!,
        surname: String!,
        identityId: String!,
        phone: String, 
        IBAN: String, 
        salary: Int
      ): String
      
      createProperty(
        uuid: String!, 
        title: String!, 
        description: String!, 
        type: Int!, 
        lat: Int!, 
        lon: Int!, 
        priceAmount: Int!, 
        currency: String!
      ): String
      
      contactRequest(
        propertyUuid: String!,
        userUuid: String!,
        email: String!
      ): String
    }
`;

const RootQuery = `
  type Query {
  
    user(uuid: String!): User 
    users(size: Int, page: Int, query: String): [User]!
    property(uuid: String!): Property
    properties(size: Int, page: Int): [Property]!
  }
`;

const SchemaDefinition = `
  schema {
  
    query: Query
    mutation: Mutation
  }
`;

export default [SchemaDefinition, RootQuery, RootMutation, Property, User];