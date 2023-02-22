import refreshToken from "../../models/auth/refreshToken.js";
import config from "../../config/auth.config.js";
import { v4 as uuidv4 } from "uuid";
import user from "../../models/auth/user.js";

async function createToken(user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  let _token = uuidv4();

  let refreshToken = {
    token: _token,
    userID: user._id,
    expiryDate: expiredAt.getTime(),
  };

  await createRefreshToken(refreshToken);

  return _token;
}

async function verifyExpiration(token) {
  return token.expiryDate.getTime() < new Date().getTime();
}

async function getAllRefreshToken() {
  try {
    return await refreshToken.find();
  } catch (error) {
    throw new Error(error);
  }
}

async function getRefreshTokenById(id) {
  try {
    return await refreshToken.findById(id);
  } catch (error) {
    throw new Error(error);
  }
}

async function getRefreshTokenFindOne(where = {}) {
  try {
    return await refreshToken
      .findOne({ ...where })
      .populate({ path: "userID", select: "_id", model: user });
  } catch (error) {
    throw new Error(error);
  }
}

async function createRefreshToken(newRefreshToken) {
  try {
    const newDoc = new refreshToken({ ...newRefreshToken });
    await newDoc.save();
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteRefreshToken(id) {
  try {
    return await refreshToken.deleteOne({ _id: id });
  } catch (error) {
    throw new Error(error);
  }
}

export {
  createToken,
  verifyExpiration,
  getAllRefreshToken,
  getRefreshTokenById,
  createRefreshToken,
  deleteRefreshToken,
  getRefreshTokenFindOne,
};
