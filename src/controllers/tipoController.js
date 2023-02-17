import {
  createTipo,
  deleteTipo,
  getAllTipo,
  getTipoById,
  updateTipo,
} from "../servico/tipo.js";

class TipoController {
  static getTipos = async (req, res) => {
    try {
      res.status(200).json(await getAllTipo());
    } catch (error) {
      res.status(500).send(error);
    }
  };

  static getTipo = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        res.status(200).json((await getTipoById(id)) || {});
        return;
      }
      res.status(422);
      res.send("Id inválido");
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  static createTipo = async (req, res) => {
    try {
      const tipoNew = req.body;
      if (tipoNew) {
        if (await createTipo(tipoNew)) {
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

  static updateTipo = async (req, res) => {
    try {
      const tipoUpdate = req.body;
      const id = req.params.id;
      if (id && tipoUpdate) {
        let achou = await updateTipo(id, tipoUpdate);
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

  static deleteTipo = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        if (await deleteTipo(id)) {
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

export default TipoController;
