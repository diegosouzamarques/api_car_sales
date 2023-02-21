import anuncio from "../../models/anuncio.js";
import vendedor from "../../models/vendedor.js";
import tipo from "../../models/tipo.js";
import categoria from "../../models/categoria.js";

async function getAllAnuncio() {
  try {
    return await anuncio
      .find()
      .populate({ path: "vendedorID", select: "nome", model: vendedor })
      .populate({ path: "tipoID", select: "tipo", model: tipo })
      .populate({ path: "categoriaID", select: "categoria", model: categoria });
  } catch (error) {
    throw new Error(error);
  }
}

async function getAnucioById(id) {
  try {
    return await anuncio
      .findById(id)
      .populate({ path: "vendedorID", select: "nome", model: vendedor })
      .populate({ path: "tipoID", select: "tipo", model: tipo })
      .populate({ path: "categoriaID", select: "categoria", model: categoria });
  } catch (error) {
    throw new Error(error);
  }
}

async function createAnuncio(newAnuncio) {
  try {
    const newDoc = new anuncio({ ...newAnuncio });
    await newDoc.save();
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateAnuncio(id, modAnuncio) {
  try {
    const filter = { _id: id };
    const anuncioFind = await anuncio.findOneAndUpdate(filter, modAnuncio, {
      new: true,
    });
    return anuncioFind;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteAnuncio(id) {
  try {
    return await anuncio.deleteOne({ _id: id });
  } catch (error) {
    throw new Error(error);
  }
}

export {
  getAllAnuncio,
  getAnucioById,
  createAnuncio,
  updateAnuncio,
  deleteAnuncio,
};
