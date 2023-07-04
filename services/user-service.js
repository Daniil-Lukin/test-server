const userModel = require("../models/user-model");
const bycript = require("bcrypt");
const tokenService = require("../services/token-service");
const tokenModel = require("../models/token-model");

class UserService {
  async registration(email, password) {
    const hashPassword = await bycript.hash(password, 7);
    const user = new userModel({ email: email, password: hashPassword });
    await user.save();
    const dataToSend = await this.getDataToSend(user);

    return dataToSend;
  }

  async login(email, password) {
    const userData = await userModel.findOne({ email });
    if (!userData) {
      throw new Error(`User was not found`);
    }
    console.log(userData);
    const equalPasswords = await bycript.compare(password, userData.password);
    if (!equalPasswords) {
      throw new Error(`Invalid password`);
    }

    const dataToSend = await this.getDataToSend(userData);
    return dataToSend;
  }

  async logout(refreshToken) {
    return tokenService.removeRefreshToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error(`Unauthorized error`);
    }
    const userToken = tokenService.verifyToken(
      refreshToken,
      process.env.JWT_REFRESH
    );
    const { _id, user, dbToken } = tokenModel.findOne(refreshToken);
    if (userToken & dbToken) {
      const userData = userModel.findOne({ _id: user });
      const dataToSend = await this.getDataToSend(userData);
      return dataToSend;
    } else {
      throw new Error(`Unauthorized error`);
    }
  }

  async getDataToSend(userData) {
    const { id, email, ...rest } = userData;
    const tokens = tokenService.generateToken({ id, email });
    await tokenService.saveToken(id, tokens.refreshToken);

    return {
      ...tokens,
      email,
    };
  }

  async deleteUser(email) {
    const userData = await userModel.findOneAndDelete({ email });
    if (!userData) {
      throw new Error(`${email} user was not found`);
    }
    const { refreshToken, ...info } = await tokenModel.findOneAndDelete({
      user: userData._id,
    });

    return userData;
  }
}

module.exports = new UserService();
