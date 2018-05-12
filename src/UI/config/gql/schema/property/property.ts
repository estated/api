import Geo from "./geo"
import Price from "./price"
import Rent from "./rent";

const Property = `
    type Property {
        uuid: String,
        title: String,
        description: String,
        createdAt: String,
        type: Int,
        geo: Geo,
        price: Price,
        owner: User,
        currentRent: Rent,
    }
`;

export default () => [Property, Price, Geo, Rent];