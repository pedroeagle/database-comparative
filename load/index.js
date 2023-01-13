const {loadPostgresDatabase, extractDumpFile, loadMongoDatabase} = require('./load');
const {generateMongoDatabaseFromSqlFiles} = require('./parse');

const load = async () =>
  // generateMongoDatabaseFromSqlFiles();
  extractDumpFile().then(async () => await Promise.all([loadMongoDatabase(), loadPostgresDatabase()]));
load().then(() => {
  process.exit();
});
