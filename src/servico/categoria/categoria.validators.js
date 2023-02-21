import { param, body, validationResult } from "express-validator";

const checkIdCategoria = [
    param("id")
    .exists()
    .withMessage("ID categoria não informado")
    .isMongoId()
    .withMessage("ID categoria formato não previsto")
  ];

const checkCategoria = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

const validationCreateUpdateCategoria = [
   body("categoria")
   .exists()
   .withMessage("Categoria não informado")
   .not()
   .isEmpty()
   .trim()
   .escape()
   .withMessage("Categoria vazio")
];  

  export { checkIdCategoria, checkCategoria, validationCreateUpdateCategoria }