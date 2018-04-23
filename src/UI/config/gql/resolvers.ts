import user from 'ui/reducers/user/query/findOne'
import users from 'ui/reducers/user/query/all'
import property from 'ui/reducers/property/query/findOne'
import properties from 'ui/reducers/property/query/all'
import createProperty from 'ui/reducers/property/mutation/create'
import contactRequest from 'ui/reducers/property/mutation/contact'
import createUser from 'ui/reducers/user/mutation/create'

const resolvers = {
    Query: {
        user,
        users,
        property,
        properties,
    },
    Mutation: {
        createUser,
        createProperty,
        contactRequest
    }
};

export default resolvers;
