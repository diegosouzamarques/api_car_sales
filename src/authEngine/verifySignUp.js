import { getUserFindOne } from "../servico/auth/user.js";

const ROLES = ["user", "admin", "moderator"];

async function checkDuplicateUsernameOrEmail (req, res, next) {
    const where = { $or: [ { username: req.body.username}, { email: req.body.email } ] };
    const userExist = await getUserFindOne(where);
    if (userExist){
        res.status(400).send({
            message: "Failed! Username or Email is already in use!"
          });
         return;
    }
    next();
  };

async function checkRolesExisted (req, res, next) {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };

  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  export default verifySignUp;