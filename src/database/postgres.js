const Sequelize = require("sequelize");
const databaseConfig = require("../config/postgres");

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
    }
}

class Default {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize({ ...databaseConfig, database: 'postgres' });
    }
}

module.exports = { sequelize: new Database().connection, sequelize_default: new Default().connection }