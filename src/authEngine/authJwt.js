import  jwt  from "jsonwebtoken";
import config from "../config/auth.config.js";
import { getUserById } from "../servico/auth/user.js";

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

function verifyToken (req, res, next){
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Nenhum token fornecido!",
    });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

async function isAdmin (req, res, next){
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

async function isModerator(req, res, next){
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

async function isModeratorOrAdmin(req, res, next){
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
  export default authJwt;