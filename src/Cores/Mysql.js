const mysql = require('mysql2');

class MysqlClient {
   constructor(configs) {
      this.connection = mysql.createConnection({
         host: configs.host,
         port: configs.port,
         database: configs.database,
         user: configs.user,
         password: configs.password,
      });
   }
}

module.exports = MysqlClient;