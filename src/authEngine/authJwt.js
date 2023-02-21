import { jwt } from "jsonwebtoken";
import { config } from "../config/auth.config.js";

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Nenhum token fornecido!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  const user = await getUserById(id);
  if (user.roles.indexOf({ name: "admin" }) > -1) {
    next();
    return;
  }
  res.status(403).send({
    message: "Require Admin Role!",
  });
  return;
};

isModerator = async (req, res, next) => {
  const user = await getUserById(id);
  if (user.roles.indexOf({ name: "moderator" }) > -1) {
    next();
    return;
  }
  res.status(403).send({
    message: "Require Moderator Role!",
  });
  return;
};

isModeratorOrAdmin = async (req, res, next) => {
  const user = await getUserById(id);
  if (user.roles.indexOf({ name: "admin" }) > -1) {
    next();
    return;
  }

  if (user.roles.indexOf({ name: "moderator" }) > -1) {
    next();
    return;
  }
  res.status(403).send({
    message: "Require Moderator or Admin Role!",
  });
  return;
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
  };
  module.exports = authJwt;