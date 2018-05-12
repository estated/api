import GetUserByUuidQuery from "application/query/user/getByUuid/getUserByUuidQuery";

export default async (obj, args, {ask}) => {
    if (! obj.lesseeUuid) {

        return null;
    }

    const user = await ask(new GetUserByUuidQuery(obj.lesseeUuid));

    return user.data;
};
