import { param, body, validationResult } from "express-validator";

const checkIdTipo = [
    param("id")
    .exists()
    .withMessage("ID tipo não informado")
    .isMongoId()
    .withMessage("ID tipo formato não previsto")
  ];

const checkTipo = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

  const validationCreateUpdateTipo = [
    body("tipo")
    .exists()
    .withMessage("Tipo não informado")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Tipo vazio")
 ];  
 

  export { checkIdTipo, checkTipo, validationCreateUpdateTipo }