const MysqlClient = require('../../Cores/Mysql');

class Core {
   client = new MysqlClient(configs.MYSQL.DURAK);

   constructor() {}

   query(sql, binds) {
      return new Promise((resolve, reject) => {
         this.client.connection.query(sql, binds, (err, result) => {
            if (err) {
               reject(err);
            } else {
               resolve(result);
            }
         })
      })
   }
}

module.exports = Core;