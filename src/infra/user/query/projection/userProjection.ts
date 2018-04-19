import { Domain, EventStore } from 'hollywood-js'
import { log } from "util";
import User from "domain/user/model/user";
import UserView from "domain/user/query/UserView";
import Elastic from "infra/shared/elastic/elastic";
import UserWasCreated from "domain/user/event/userWasCreated";

export default class UserProjectionFactory extends EventStore.EventSubscriber {
    private readonly elastic: Elastic;

    constructor(private readonly userRepository: Domain.IRepository<User>) {
        super();
        this.elastic = new Elastic();
        this.userRepository = userRepository;
    }

    protected onUserWasCreated(event: UserWasCreated) {
        this.generateUserProjection(event.uuid).catch(log);
    }

    private async generateUserProjection(uuid: string): Promise<void> {
        const user: any = await this.userRepository.load(uuid);

        this.elastic.add('user', uuid, UserProjectionFactory.userView(user)).catch(log);
    }

    private static userView(user: User | any): UserView {
        delete user['methodPrefix'];
        delete user['events'];

        return <UserView>user;
    }
}
