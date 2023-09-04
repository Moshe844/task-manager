const pgp = require('pg-promise')();
const connectionString = 'postgresql://username:password@localhost:5432/taskManager';
const db = pgp(connectionString);

module.exports = db;