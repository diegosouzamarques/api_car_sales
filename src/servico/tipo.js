import tipo from "../models/tipo.js";

async function getAllTipo() {
    try {
      return await tipo
        .find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getTipoById(id) {
    try {
      return await tipo
        .findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function createTipo(newTipo) {
    try {
      const newDoc = new tipo({ ...newTipo });
      await newDoc.save();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function updateTipo(id, modTipo) {
    try {
      const filter = { _id: id };
      const tipoFind = await tipo.findOneAndUpdate(filter, modTipo, {
        new: true,
      });
      return tipoFind;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function deleteTipo(id) {
    try {
      return await tipo.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  
  export {
    getAllTipo,
    getTipoById,
    createTipo,
    updateTipo,
    deleteTipo,
  };