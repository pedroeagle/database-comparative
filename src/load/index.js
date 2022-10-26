const { loadPostgresDatabase, extractDumpFile, loadMongoDatabase } = require('./load')
const { exec } = require("child_process")
const load = async () =>
    await Promise.all([extractDumpFile(), loadMongoDatabase(), loadPostgresDatabase()])
load().then(() => {
    process.exit()
})
