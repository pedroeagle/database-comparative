const { loadPostgresDatabase, resetPostgresDatabase } = require('./load')
const loadDatabases = async () => {
    resetPostgresDatabase().then(async () => {
        await loadPostgresDatabase()
    })
}
loadDatabases()