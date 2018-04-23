import Geo from "./geo"
import Price from "./price"

const Property = `
    type Property {
        uuid: String,
        title: String,
        description: String,
        createdAt: String,
        type: Int,
        geo: Geo,
        price: Price
    }
`;

export default () => [Property, Price, Geo];