import {
  createAnuncio,
  deleteAnuncio,
  getAllAnuncio,
  getAnucioById,
  updateAnuncio,
} from "../servico/anuncio.js";

class AnuncioController {
  static getAnuncios = async (req, res) => {
    try {
      res.status(200).json(await getAllAnuncio());
    } catch (error) {
      res.status(500).send(error);
    }
  };

  static getAnuncio = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        res.status(200).json((await getAnucioById(id)) || {});
        return;
      }
      res.status(422);
      res.send("Id inválido");
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  static createAnuncio = async (req, res) => {
    try {
      const anuncioNew = req.body;
      if (anuncioNew) {
        if (await createAnuncio(anuncioNew)) {
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

  static updateAnuncio = async (req, res) => {
    try {
      const anuncioUpdate = req.body;
      const id = req.params.id;
      if (id && anuncioUpdate) {
        let achou = await updateAnuncio(id, anuncioUpdate);
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

  static deleteAnuncio = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        if (await deleteAnuncio(id)) {
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

export default AnuncioController;
