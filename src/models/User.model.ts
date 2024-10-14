import mongoose, {Schema , Document} from "mongoose";

export  interface Message extends Document {
    _id: string,
    content : string,
    createdAt: Date,
}

export interface User extends Document {
    username : string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpairy: Date,
    isVerify : boolean,
    isAcceptingMessage : boolean,
    messages : Message[],
}

// Creating schema's 
const MessageSchema : Schema<Message> = new Schema({
    content: {
        type : String,
        required: true,
    },
    createdAt: {
        type: Date,
        required : true,
        default: Date.now()
    }
});

const UserSchema : Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Please username are required!"],
        unique: true,
        trim: true,
    },
   email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\..+/, 'Please use a valid email address'],
   },
   password : {
        type: String,
        required: [true, "Password are required!"],
   },
   verifyCode : {
        type: String,
        required: true,
   },
   verifyCodeExpairy : {
        type: Date,
        required: true
   },
   isVerify: {
        type : Boolean,
        default: false
   },
   isAcceptingMessage: {
        type: Boolean,
        default: true,
   },
   messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel

