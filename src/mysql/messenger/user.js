const CoreMysql = require('./core');

class User extends CoreMysql {
    constructor() {
        super();
    }

    async findByUsername(props) {
        const { username } = props;

        return await this.query(`
           SELECT
              id,
              username,
              age,
              email,
              password
          FROM users WHERE username = ?
      `, [username]).then(result => result[0]);
    }
}

module.exports = new User();
