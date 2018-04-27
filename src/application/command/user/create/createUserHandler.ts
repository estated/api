import { Application } from 'hollywood-js';
import CreateUserCommand from './createUserCommand';
import User from 'domain/user/model/user';
import GetUser from 'domain/user/repository/query/getUser';
import Email from 'domain/user/valueObject/email';
import WriteRepository from "domain/shared/error/repository/write";

export default class CreateUserHandler implements Application.ICommandHandler {
    constructor(
        private readonly userReadModel: GetUser,
        private readonly userRepository: WriteRepository<User>
    ) {}

    async handle(command: CreateUserCommand): Promise<void|Application.IAppError> {
        await this.validateUuidAndEmail(
            command.uuid,
            command.email,
            command.identity
        );

        const user = User.create(
            command.uuid,
            command.email,
            command.name,
            command.surname,
            command.identity,
            command.phone,
            command.IBAN,
            command.salary
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

    private async validateUuidAndEmail(uuid: string, email: Email, identity: string): Promise<void> {
        let userExist: any = await this.userReadModel.getUserByUuid(uuid)
            || await this.userReadModel.getUserByEmail(email.value)
            || await this.userReadModel.getUserByIdentity(identity)
        ;

        if (userExist) {
            throw <Application.IAppError>{
                message: 'Already Exist',
                code: 409
            };
        }
    }

}
