import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    id:{type: String},
    token:{type: String},
    expiryDate:{type: Schema.Types.Date, required: true},
    userID: {type: mongoose.ObjectId, ref: 'user', required: true}
 },{
    versionKey: false
 });
 
 const refreshToken = mongoose.model('refreshToken', refreshTokenSchema, 'refreshToken');
 
 export default refreshToken;