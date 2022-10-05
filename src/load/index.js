const { loadPostgresDatabase, resetPostgresDatabase, loadMongoDatabase } = require('./load')
const loadDatabases = async () => {
    resetPostgresDatabase().then(async () => {
        await loadPostgresDatabase()
    })
    await loadMongoDatabase()
}
loadDatabases()