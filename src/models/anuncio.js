import mongoose from "mongoose";

function getValor(value) {
    if (typeof value !== 'undefined') {
       return parseFloat(value.toString());
    }
    return value;
};

const anuncioSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo: {type: String, required: true},
        descricao: {type: String, required: true},
        valor: {type: mongoose.Schema.Types.Decimal128, required: true, default: 0, get: getValor},
        vendedorID:{type: mongoose.Schema.Types.ObjectId, ref: 'vendedor', required: true},
        tipoID:{type: mongoose.Schema.Types.ObjectId, ref: 'tipo', required: true},
        ano:{type: Date},        
        dataCreated: {type: Date, immutable: true, default: Date.now},
        dataUpdated: {type: Date, immutable: true, default: Date.now},
        categoriaID: {type: mongoose.ObjectId, ref: 'categoria', required: true}
    }, 
    {toJSON: {getters: true},
    versionKey: false
}
);

const anuncio = mongoose.model('anuncio', anuncioSchema, 'anuncio');

export default anuncio;
