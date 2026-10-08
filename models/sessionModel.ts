import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

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
type Session = InferSchemaType<typeof SessionSchema>;
const modelCache = globalThis as typeof globalThis & { sessionModel?: Model<Session> };

const UserSession =
  modelCache.sessionModel ??
  (mongoose.models.Session as Model<Session> | undefined) ??
  mongoose.model<Session>("Session", SessionSchema);

modelCache.sessionModel = UserSession;
export default UserSession;
