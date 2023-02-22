import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/auth.config.js";
import { getAllRole } from "../../servico/auth/role.js";
import { createUser, getUserFindOne } from "../../servico/auth/user.js";
import { createToken, getRefreshTokenFindOne, verifyExpiration, deleteRefreshToken } from "../../servico/auth/refreshToken.js";

class authController {

  static signup = async (req, res) => {
    if (req.body.roles.length <= 0) {
      return res.status(500).send({ message: "User without roles!" });
    }
  
    const where = { name: { $in: [...req.body.roles] } };
  
    const roles = await getAllRole(where);
  
    if (roles.length <= 0) {
      return res.status(500).send({ message: "User without roles!" });
    }
  
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      roles: [...roles],
    };
  
    if (await createUser(newUser)) {
      res.send({ message: "User registered successfully!" });
    }
  };

  static signin = async (req, res) => {
    const user = await getUserFindOne({ username: req.body.username });
  
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
  
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
   
    var token = jwt.sign({ id: user.id }, config.secretKey, {
      expiresIn: config.jwtExpiration
    });

    let refreshToken = await createToken(user);
  
    var authorities = [];
  
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
  
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      refreshToken: refreshToken,
    });
  };

  static refreshToken = async (req, res) =>{
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
      let refreshToken = await getRefreshTokenFindOne({ token: requestToken });
    
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      if (await verifyExpiration(refreshToken)) {
        await deleteRefreshToken(refreshToken.id);
        
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
  
      const user = refreshToken.userID._id;
      let newAccessToken = jwt.sign({ id: user }, config.secretKey, {
        expiresIn: config.jwtExpiration,
      });
      let newRefreshToken = await createToken({_id: user});
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      return res.status(500).send( err );
    }

  } 

}

export default authController;