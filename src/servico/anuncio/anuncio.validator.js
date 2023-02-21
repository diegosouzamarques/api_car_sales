import { body, validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import { getCategoriaById } from "../categoria.js";
import { getTipoById } from "../tipo.js";
import { getVendedorById } from "../vendedor.js";

const validationCreateUpdateAnuncio = (optional = false) => {
  return [
    body("titulo")
      .exists()
      .withMessage("Título não informado")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .optional(optional)
      .withMessage("Título vazio"),
    body("descricao")
      .exists()
      .withMessage("Descrição não informado")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .optional(optional)
      .withMessage("Descrição vazio"),
    body("valor")
      .exists()
      .withMessage("Valor não informado")
      .not()
      .isEmpty()
      .withMessage("Valor informado inválido")
      .isNumeric()
      .withMessage("Valor formato invalido")
      .not()
      .isFloat({ lt: 0 })
      .optional(optional)
      .withMessage("Valor minimo é 0"),
    body("vendedorID")
      .custom(async (value, { req }) => {
        let validated = true;

        if (new ObjectId(value).toString() !== value) validated = false;

        const vendedor = await getVendedorById(value);
        if (!vendedor) validated = false;

        if (!validated) throw new Error("vendedorID não é ID válido.");

        return validated;
      })
      .optional(optional),
    body("tipoID")
      .custom(async (value, { req }) => {
        let validated = true;

        if (new ObjectId(value).toString() !== value) validated = false;

        const tipo = await getTipoById(value);
        if (!tipo) validated = false;

        if (!tipo) throw new Error("tipoID não é ID válido.");

        return validated;
      })
      .optional(optional),
    body("categoriaID")
      .custom(async (value, { req }) => {
        let validated = true;

        if (new ObjectId(value).toString() !== value) validated = false;

        const tipo = await getCategoriaById(value);
        if (!tipo) validated = false;

        if (!tipo) throw new Error("categoriaID não é ID válido.");

        return validated;
      })
      .optional(optional),
    body("ano")
      .isISO8601()
      .toDate()
      .optional(optional)
      .withMessage("Data inválida"),
  ];
};

const checkAnuncio = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const anuncio_properties = [
    "titulo",
    "descricao",
    "valor",
    "vendedorID",
    "tipoID",
    "categoriaID",
    "ano"
]

const onlyOneProperties = (req, res, next) => {
 let find = false;
  Object.keys(req.body).forEach((property) => {
    if (anuncio_properties.indexOf(property) > -1) find = true;
  });
  if (!find) {
    return res
      .status(400)
      .json({ errors: "Não contém nenhuma informação sobre anuncio" });
  }
  next();
};

export { onlyOneProperties, checkAnuncio, validationCreateUpdateAnuncio };
