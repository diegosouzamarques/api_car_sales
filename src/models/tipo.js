import mongoose from "mongoose";

const tipoSchema = new mongoose.Schema({
    id:{type: String},
    tipo:{type: String, required: true} 
});

const tipo = mongoose.model('tipo', tipoSchema, 'tipo');

export default tipo;