const authService = require("../../../services/auth");

async function auth(req, res, next) {
   const token = req.headers['token'];

   console.log('token', token);

   req.user = await authService.auth({
      token
   });

   next();
}

module.exports = auth;