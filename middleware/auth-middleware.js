const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error({ message: `unauthorized user` });
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      throw new Error({ message: `unauthorized user` });
    }
    const validToken = tokenService.verifyToken(
      accessToken,
      process.env.JWT_ACCESS
    );
    if (!validToken) {
      throw new Error({ message: `unauthorized user` });
    }
    console.log(validToken);
    req.user = validToken;
    next();
  } catch (e) {
    next(e);
  }
};
