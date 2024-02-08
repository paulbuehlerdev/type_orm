import { AppDataSource } from "./db/data-source";
import { DbConfig } from "./db/entities//DbConfig";


async function demo() {
  const configRepo = AppDataSource.getRepository(DbConfig);

  console.log('creating a new DbConfig');
  // Using repository's create method to initialize the object in one line
  const newConfig = configRepo.create({
    host: 'localhost',
    port: 5432,
    https_enabled: false
  });
  await configRepo.save(newConfig);
  console.log(`saved a new DbConfig with id ${newConfig.id}`);

  console.log('\n\ngetting all the DbConfigs');
  const configs = await configRepo.find();
  console.log(configs);
}


async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    return demo();
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
  }
}

if (require.main === module) {
  console.log('hello from app.ts');
  main().then();
}
