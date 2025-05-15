import { faker } from '@faker-js/faker';

export const generateValidUser = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'abc123',
    gender: faker.helpers.arrayElement(['男', '女', 'その他']),
    avatarUrl: faker.helpers.arrayElement([
        'sea-angel.png',
        'leafy-seadragon.png',
        'dumbo-octopus.png',
        'nautilus.png',
        'coelacanth.png',
        'bottlenose-dolphin.png',
        'goblin-shark.png',
    ]),
    message: faker.lorem.sentence(),
});

export const generateInvalidUser = () => ({
    name: '',
    email: 'invalid-email',
    password: 'sho12',
    gender: '火星人',
    avatarUrl: 'invalid-avatar.png',
    message: '',
});
