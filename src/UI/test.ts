import Property from "domain/property/model/property";
import Geo from "domain/property/valueObject/geo";
import Price from "domain/property/valueObject/price";
import UserStore from 'infra/shared/dependencyInjection/repositories/userRepositoryFactory.ts'
import PropertyStore from 'infra/shared/dependencyInjection/repositories/propertyRepositoryFactory'
import User from "domain/user/model/user";
import Email from "domain/user/valueObject/email";
import Bus from 'infra/shared/dependencyInjection/busFactory';

Bus().then(() => {
    const property = Property.create(
        'caca',
        'caca',
        'caca',
        1,
        new Geo(123, 123),
        new Price(123, 'EUR')
    );
    
    PropertyStore.save(property).then(()=>console.log('SAVED!', property));

    try {

        const user = User.create((new Date()).toISOString(), Email.fromString('qweqwe@gmail.com'));

        UserStore.save(user).then(()=>console.log('SAVED!', user));
    } catch (err) {
        console.log(err)
    }
});
