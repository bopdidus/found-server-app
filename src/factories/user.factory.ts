import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User, UserRole } from '../entity/User';


define(User, (faker: typeof Faker, settings: { role: string }) => {
    /*const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);
    const username = faker.internet.userName(firstName, lastName);*/

    const user = new User();
    user.firstName = "admin";
    user.lastName = "admin";
    user.email = "admin@admin.com";
    user.password = 'admin12345';
    user.isActivated= true;
    user.role = UserRole.ADMIN;
    return user;
});