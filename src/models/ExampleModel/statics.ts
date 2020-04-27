import {Person} from ".";
export async function findPersonByName(name: string) {
    return await Person.findOne({
        name
    });
} 