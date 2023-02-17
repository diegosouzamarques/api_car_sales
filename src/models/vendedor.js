import mongoose from "mongoose";

const vendedorSchema = new mongoose.Schema({
    id:{type: String},
    nome:{type: String, required: true}
},{
    versionKey: false
 });

const vendedor = mongoose.model('vendedor', vendedorSchema, 'vendedor');

export default vendedor;