const Core = require('./core');

class User extends Core {
   constructor() {
      super();
   }

   async findByUsername(props) {
      const { username } = props;

      return await this.query(`
         SELECT * FROM users WHERE username = ?
      `, [username]).then(result => result[0]);
   }
}

module.exports = new User();