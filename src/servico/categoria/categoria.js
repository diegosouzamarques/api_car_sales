import categoria from "../../models/categoria.js";

async function getAllCategoria() {
    try {
      return await categoria
        .find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getCategoriaById(id) {
    try {
      return await categoria
        .findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function createCategoria(newCategoria) {
    try {
      const find = await categoria.findOne({categoria: newCategoria.categoria });
      console.log(find);
      if (find){
        throw new Error('Categoria já cadastrada');
      }
      const newDoc = new categoria({ ...newCategoria });
      await newDoc.save();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function updateCategoria(id, modCategoria) {
    try {
      const filter = { _id: id };
      const categoriaFind = await categoria.findOneAndUpdate(filter, modCategoria, {
        new: true,
      });
      return categoriaFind;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async function deleteCategoria(id) {
    try {
      return await categoria.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
  
  export {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
  };