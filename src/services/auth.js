const RedisClient = require("../Cores/Redis");
const {User} = require('../mysql/durak');
const {httpCode} = require("../Cores/HttpError");

class Auth {
   authStorage = new RedisClient('auth_users');

   User = User

   constructor() {
   }

   async login(props) {
      const {username, password} = props;

      const user = await this.User.findByUsername({
         username
      })

      if (!user) {
         throw new HttpError('username/password is wrong')
      }

      const isPasswordRight = user.password === password;

      if (!isPasswordRight) {
         throw new HttpError('username/password is wrong')
      }

      const authData = {
         id: user.id, username: user.username, password: user.password, token: 'token'
      }

      await this.authStorage.client.set(authData.token, JSON.stringify(authData));

      return authData;
   }

   async auth(props) {
      const {token} = props;

      const authData = await this.authStorage.client.get(token);

      if (!authData) {
         throw new HttpError('invalid token', httpCode.AUTH_ERROR);
      }

      return JSON.parse(authData);
   }
}

module.exports = new Auth();