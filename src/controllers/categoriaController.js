import {
  createCategoria,
  deleteCategoria,
  getAllCategoria,
  getCategoriaById,
  updateCategoria,
} from "../servico/categoria/categoria.js";

class CategoriaController {
  static getCategorias = async (req, res) => {
    try {
      res.status(200).json(await getAllCategoria());
    } catch (error) {
      res.status(500).send(error);
    }
  };

  static getCategoria = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        res.status(200).json((await getCategoriaById(id)) || {});
        return;
      }
      res.status(422);
      res.send("Id inválido");
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  static createCategoria = async (req, res) => {
    try {
      const categoriaNew = req.body;
      if (categoriaNew) {
        if (await createCategoria(categoriaNew)) {
          res.status(201).send();
          return;
        } else {
          res.status(422).send("não foi possível inserir");
          return;
        }
      }
      res.status(422).send("dados inválido");
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  static updateCategoria = async (req, res) => {
    try {
      const categoriaUpdate = req.body;
      const id = req.params.id;
      if (id && categoriaUpdate) {
        let achou = await updateCategoria(id, categoriaUpdate);
        if (achou) {
          res.status(204).json(achou);
          return;
        } else {
          res.status(422).send("não foi possível atualizar, não encontrado");
          return;
        }
      }
      res.status(422).send("dados inválido");
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  static deleteCategoria = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        if (await deleteCategoria(id)) {
          res.status(202).send();
          return;
        }
      } else {
        res.status(422).send("não foi possível deletar");
        return;
      }
      res.status(422).send("Id inválido");
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
}

export default CategoriaController;
