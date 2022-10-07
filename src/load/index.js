const { loadPostgresDatabase, extractDumpFile } = require('./load')
const loadDatabases = async () => {
    await extractDumpFile()
    await loadPostgresDatabase()
}
loadDatabases()