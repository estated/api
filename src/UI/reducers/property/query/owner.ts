import GetUserByUuidQuery from "application/query/user/getByUuid/getUserByUuidQuery";

export default async (obj, args, {ask}) => {
    if (! obj.ownerUuid) {

        return null;
    }

    const user = await ask(new GetUserByUuidQuery(obj.ownerUuid));

    return user.data;
};
