const AuthService = require("../Services/AuthService");
module.exports = function isAdmin() {
  return async function (req, res, next) {
    if (req.user === null || req.user === undefined) {
      return res.status(403).send("Please register or login to use Admin routes");
    } else {
      const user = await AuthService.findUserById(req.user.Id);
      if (user.userRole != true) {
        return res.status(403).send("Access denied");
      }
      next();
    }
  };
};
