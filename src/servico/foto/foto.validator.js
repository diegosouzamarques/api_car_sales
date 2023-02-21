import { param, body, validationResult } from "express-validator";
import { getAnucioById } from "../anuncio/anuncio.js";
import { ObjectId } from "mongodb";

const checkIdFoto = [
  param("id")
    .exists()
    .withMessage("ID foto não informado")
    .isMongoId()
    .withMessage("ID foto formato não previsto"),
];

const checkFoto = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validationCreateUpdateFoto = (optional=false) => {
    return  [
        body("url")
        .exists()
        .withMessage("Url não informado")
        .not()
        .isEmpty()
        .trim()
        .escape()
        .optional(optional)
        .withMessage("Url vazio"),
        body("anuncioID")
        .custom(async (value, { req }) => {
          let validated = true;
    
          if (new ObjectId(value).toString() !== value) validated = false;
    
          const anuncio = await getAnucioById(value);
          if (!anuncio) validated = false;
    
          if (!anuncio) throw new Error("anuncioID não é ID válido.");
    
          return validated;
        })
        .optional(optional)
     ]; 
}

const foto_properties = [
    "url",
    "anuncioID"
]

const onlyOneProperties = (req, res, next) => {
 let find = false;
  Object.keys(req.body).forEach((property) => {
    if (foto_properties.indexOf(property) > -1) find = true;
  });
  if (!find) {
    return res
      .status(400)
      .json({ errors: "Não contém nenhuma informação sobre foto" });
  }
  next();
};

export { checkIdFoto, checkFoto, validationCreateUpdateFoto, onlyOneProperties };
