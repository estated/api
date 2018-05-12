const User = `
    type User { 
        uuid: String!, 
        email: String,
        name: String!,
        surname: String!,
        phone: String,
        identityId: String,
        createdAt: String!,
        properties: [Property]!
    }
`;

export default User;

