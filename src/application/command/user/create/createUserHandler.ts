import { Application } from 'hollywood-js';
import CreateUserCommand from './createUserCommand';
import User from 'domain/user/model/user';
import GetUser from 'domain/user/repository/query/getUser';
import Email from 'domain/user/valueObject/email';
import UserView from "domain/user/query/UserView";
import {Domain} from "hollywood-js/index";

export default class CreateUserHandler implements Application.ICommandHandler {
    constructor(private userStore: GetUser, private userRepository: Domain.IRepository<User>, ) {}

    async handle(command: CreateUserCommand): Promise<void|Application.IAppError> {
        await this.validateUuidAndEmail(command.uuid, command.email);

        const user = User.create(
            command.uuid,
            command.email
        );

        try {
            await this.userRepository.save(user);

        } catch (err){
            throw <Application.IAppError>{
                message: err.message,
                code: 500
            };
        }
    }

    private async validateUuidAndEmail(uuid: string, email: Email): Promise<void> {
        let userExist: any = await this.userStore.getUserByUuid(uuid);
        CreateUserHandler.failIfAlreadyExist(userExist);
        userExist = await this.userStore.getUserByEmail(email.value);
        CreateUserHandler.failIfAlreadyExist(userExist);
    }

    private static failIfAlreadyExist(check: UserView|null): void {
        if (null !== check) {
            throw <Application.IAppError>{
                message: 'Already Exist',
                code: 409
            };
        }
    }
}
