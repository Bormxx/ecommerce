import * as schema from './schema';
import { db } from '.';


const main = async () => {
  try {
    console.log('Seeding database...');

    await db.delete(schema.users);

    await db.insert(schema.users).values([
      { id: 1, firstName: "den", lastName: "den", email: "valera@valera", password: "qwerty" },
      { id: 2, firstName: "don", lastName: "don", email: "voloro@voloro", password: "qwerty" },
      { id: 3, firstName: "dyn", lastName: "dyn", email: "vylyry@vylyry", password: "qwerty", test: ['borsh', 'medved'] },
    ]);

    // await db.delete(schema.profiles);

    // await db.insert(schema.profiles).values([
    //   { id: 1, userId: 1, data: "1" },
    //   { id: 2, userId: 2, data: "2" },
    //   { id: 3, userId: 3, data: "3" },
    // ]);

  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed database');
  }
};

main();