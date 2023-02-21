import { param, body, validationResult } from "express-validator";

const checkIdVendedor = [
    param("id")
    .exists()
    .withMessage("ID vendedor não informado")
    .isMongoId()
    .withMessage("ID vendedor formato não previsto")
  ];

const checkVendedor = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

  const validationCreateUpdateVendedor = [
    body("nome")
    .exists()
    .withMessage("Nome vendedor não informado")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Nome vendedor vazio")
 ];  
 

  export { checkIdVendedor, checkVendedor, validationCreateUpdateVendedor }