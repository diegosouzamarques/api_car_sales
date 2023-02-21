import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    id:{type: String},
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    roles:[{
        type: Schema.Types.ObjectId,
        ref: 'role'
    }]  
},{
   versionKey: false
});

const user = mongoose.model('user', userSchema, 'user');

export default user;