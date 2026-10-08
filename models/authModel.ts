import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

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
type Auth = InferSchemaType<typeof AuthSchema>;
const modelCache = globalThis as typeof globalThis & { authModel?: Model<Auth> };

const AuthModel =
  modelCache.authModel ??
  (mongoose.models.Auth as Model<Auth> | undefined) ??
  mongoose.model<Auth>("Auth", AuthSchema);

modelCache.authModel = AuthModel;
export default AuthModel;
