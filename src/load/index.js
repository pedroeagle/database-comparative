const { loadPostgresDatabase, extractDumpFile } = require('./load')
const { exec } = require("child_process")
const loadDatabases = async () => {
    await extractDumpFile()
    await loadPostgresDatabase()
    exec('npm run dev')
}
loadDatabases()