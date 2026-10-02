import mongoose from "mongoose";
import {Schema} from "mongoose";

const SessionSchema=new Schema({
    sessionID:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    userID:{
        type:String,
        required:true,
        index:true
    },
    refreshToken:{
        type:String,
        required:true,
        unique:true,
    },
    status:{
        type:String,
        required:true,
        enum:["active","inactive"]
    },
     expiresAt:{
        type:Date,
        required:true
    },

})
const UserSession= mongoose.model("Session",SessionSchema)
export default UserSession;