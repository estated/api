import user from 'ui/reducers/user/query/findOne'
import users from 'ui/reducers/user/query/all'
import property from 'ui/reducers/property/query/findOne'
import properties from 'ui/reducers/property/query/all'
import createProperty from 'ui/reducers/property/mutation/create'
import contactRequest from 'ui/reducers/property/mutation/contact'
import rent from 'ui/reducers/property/mutation/rent'
import createUser from 'ui/reducers/user/mutation/create'
import owner from "ui/reducers/property/query/owner";
import lessee from "ui/reducers/property/query/lessee";
import currentRent from "ui/reducers/property/query/currentRent";

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
        contactRequest,
        rent
    },
    Property: {
        owner,
        currentRent
    },
    Rent: {
        owner,
        lessee
    }
};

export default resolvers;
