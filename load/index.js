const { loadPostgresDatabase, extractDumpFile, loadMongoDatabase } = require('./load')
const { exec } = require("child_process")
const load = async () =>
    extractDumpFile().then(async () => await Promise.all([loadMongoDatabase(), loadPostgresDatabase()]))
load().then(() => {
    process.exit()
})
