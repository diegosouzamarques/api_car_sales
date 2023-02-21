import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
   id:{type: String},
   name:{type: String, required: true}
},{
   versionKey: false
});

const role = mongoose.model('role', roleSchema, 'role');

export default role;