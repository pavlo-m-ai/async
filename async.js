const fs = require('fs');
const { faker } = require(`@faker-js/faker`);
const fsPromises = fs.promises;

async function writeToFile(filename, data) {
    if (Array.isArray(data)) {
        
        data = data.join('\n');
    } else if (typeof data === 'object') {

        data = JSON.stringify(data, null, 2);
    } else if (typeof data === 'number') {
       
        data = data.toString();
    } else {
        throw new Error('Unsupported data type');
    }
    await fsPromises.writeFile(filename, data);
}

async function geneteateName(quantity = 10) {
    const names = [];

    for (let i = 0; i < quantity; i++) {
        const name = `${faker.person.firstName()} ${faker.person.lastName()}`;
        const email = faker.internet.email().toLocaleLowerCase();
        names.push(`${name}, ${email}`);
    }
    return names;
}

async function main() {
    const names = await geneteateName(10);
    await writeToFile('name.txt', [{ local:10}]);
}
main()
    .then(() => console.log('completed'))
    .catch((err) => console.error(err));
