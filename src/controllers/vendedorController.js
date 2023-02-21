import {
  createVendedor,
  deleteVendedor,
  getAllVendedor,
  getVendedorById,
  updateVendedor,
} from "../servico/vendedor/vendedor.js";

class VendedorController {
  static getVendedores = async (req, res) => {
    try {
      res.status(200).json(await getAllVendedor());
    } catch (error) {
      res.status(500).send(error);
    }
  };

  static getVendedor = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        res.status(200).json((await getVendedorById(id)) || {});
        return;
      }
      res.status(422);
      res.send("Id inválido");
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  static createVendedor = async (req, res) => {
    try {
      const vendedorNew = req.body;
      if (vendedorNew) {
        if (await createVendedor(vendedorNew)) {
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

  static updateVendedor = async (req, res) => {
    try {
      const vendedorUpdate = req.body;
      const id = req.params.id;
      if (id && vendedorUpdate) {
        let achou = await updateVendedor(id, vendedorUpdate);
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

  static deleteVendedor = async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        if (await deleteVendedor(id)) {
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

export default VendedorController;
