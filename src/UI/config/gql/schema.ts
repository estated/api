import Property from "./schema/property/property";
import User from "./schema/user/user";

const RootMutation: string = `
    type Mutation {
      
      createUser(
        uuid: String!, 
        email: String!
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
    }
`;

const RootQuery = `
  type Query {
  
    user(uuid: String!): User 
    property(uuid: String!): Property
    properties: [Property]!
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default [SchemaDefinition, RootQuery, RootMutation, Property, User];