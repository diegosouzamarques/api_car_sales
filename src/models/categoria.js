import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
   id:{type: String},
   categoria:{type: String, required: true} 
},{
   versionKey: false
});

const categoria = mongoose.model('categoria', categoriaSchema, 'categoria');

export default categoria;