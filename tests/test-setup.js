const dotenv = require('dotenv');
const dropDatabase = require('../utils/drop-database');

dotenv.config({ path: './.env.test'})

after(async () => {
await dropDatabase()
})