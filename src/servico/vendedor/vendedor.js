import vendedor from "../../models/vendedor.js";

async function getAllVendedor() {
    try {
      return await vendedor
        .find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getVendedorById(id) {
    try {
      return await vendedor
        .findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function createVendedor(newVendedor) {
    try {
      const newDoc = new vendedor({ ...newVendedor });
      await newDoc.save();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function updateVendedor(id, modVendedor) {
    try {
      const filter = { _id: id };
      const vendedorFind = await vendedor.findOneAndUpdate(filter, modVendedor, {
        new: true,
      });
      return vendedorFind;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function deleteVendedor(id) {
    try {
      return await vendedor.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  
  export {
    getAllVendedor,
    getVendedorById,
    createVendedor,
    updateVendedor,
    deleteVendedor,
  };