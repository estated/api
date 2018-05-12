import GetRentQuery from "application/query/property/getRent/getRentQuery";

export default async (PropertyView, args, {ask}) => {
    if (! PropertyView.currentRentUuid) {

        return null;
    }

    const rent = await ask(new GetRentQuery(PropertyView.currentRentUuid));

    console.log(PropertyView.currentRentUuid, 'Rent', rent);

    return rent.data;
};
