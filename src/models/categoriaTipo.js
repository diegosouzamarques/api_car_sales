import mongoose from "mongoose";

const categoriaTipoSchema = new mongoose.Schema({
    id:{type: String},
    tipoID:{type: mongoose.Schema.Types.ObjectId, ref: 'tipo', required: true},
    categoriaID:{type: mongoose.Schema.Types.ObjectId, ref: 'categoria', required: true}
},{
    versionKey: false
 });