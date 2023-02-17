import {
  createFoto,
  deleteFoto,
  getAllFoto,
  getFotoById,
  updateFoto,
} from "../servico/foto.js";

class FotoController {
  static getFotos = async (req, res) => {
    try {
      res.status(200).json(await getAllFoto());
    } catch (error) {
      res.status(500).send(error);
    }
  };

  static getFoto = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        res.status(200).json((await getFotoById(id)) || {});
        return;
      }
      res.status(422);
      res.send("Id inválido");
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  static createFoto = async (req, res) => {
    try {
      const fotoNew = req.body;
      if (fotoNew) {
        if (await createFoto(fotoNew)) {
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

  static updateFoto = async (req, res) => {
    try {
      const fotoUpdate = req.body;
      const id = req.params.id;
      if (id && fotoUpdate) {
        let achou = await updateFoto(id, fotoUpdate);
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

  static deleteFoto = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        if (await deleteFoto(id)) {
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

export default FotoController;
