import foto from "../../models/foto.js";

async function getAllFoto() {
    try {
      return await foto
        .find();
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function getFotoById(id) {
    try {
      return await foto
        .findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function createFoto(newFoto) {
    try {
      const newDoc = new foto({ ...newFoto });
      await newDoc.save();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function updateFoto(id, modFoto) {
    try {
      const filter = { _id: id };
      const fotoFind = await foto.findOneAndUpdate(filter, modFoto, {
        new: true,
      });
      return fotoFind;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function deleteFoto(id) {
    try {
      return await foto.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  
  export {
    getAllFoto,
    getFotoById,
    createFoto,
    updateFoto,
    deleteFoto,
  };
  