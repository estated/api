const Period = `
    type Period {
        startAt: String,
        endAt: String
    }
`;

const Rent = `
    type Rent {
        uuid: String,
        property: Property,
        owner: User,
        lessee: User,
        period: Period,
        price: Price,
    }
`;

export default () => [Rent, Period];