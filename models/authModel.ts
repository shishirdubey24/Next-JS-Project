import mongoose from "mongoose";
import {Schema} from "mongoose";

const AuthSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },

})
const AuthModel= mongoose.model("Auth",AuthSchema)
export default AuthModel;