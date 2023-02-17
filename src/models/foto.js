import mongoose from "mongoose";

const fotoSchema = new mongoose.Schema({
    id:{type: String},
    url:{type: String, required: true},
    anuncioID:{type: mongoose.Schema.Types.ObjectId, ref: 'anuncio', required: true}
},{
    versionKey: false
 });

const foto = mongoose.model('foto', fotoSchema, 'foto');

export default foto;