const mongoose = require("mongoose");
const { loadMongoDatabase } = require("../load/load");
const options = {
    useNewUrlParser: true,
};

const connection = mongoose.createConnection('mongodb://mongo:mongo@mongo:27017', options)
connection.on('open', async () => {
    const Admin = mongoose.mongo.Admin
    const { databases } = await new Admin(connection.db).listDatabases()
    const employees = databases.find(({ name }) => name === 'employees')
    if (!employees || employees?.sizeOnDisk <= 8192) {
        await loadMongoDatabase()
    } else {
        console.log('Mongo Database is already loaded.')
    }
})

module.exports = {
    mongoose
};