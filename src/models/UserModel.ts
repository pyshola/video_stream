import mongoose, {Schema, Document, Types} from "mongoose";
import VideoModel from "./VideoModel";
import SubscriptionModel from "./SubscriptionModel"

export interface IUser extends Document{
    _id:String;
    name:String;
    email:String;
    password:String;
    phone:String;
    username:String;
    bio:String;
    image:String;
    banner:String;
    createdAt:Date;
    updatedAt:Date;
    video:Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
    {
        email:{
            type:String,
            unique:true,
            required:[true, "Email address is required"],
            match:[
                /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
                "Email is invalid"
            ]
        },
        password:{
            type:String,
            required:true
        },
        image:{
            type:String,
            default:null
        },
        banner:{
            type:String,
            default:null
        },
        bio:{
            type:String,
            default:""
        },
        username:{
            type:String,
            required:[true, "Username is required"],
            unique:true
        },
        name:{
            type:String,
            required:[true, "Name is required"]
        }
    },
    {timestamps:true}
)

//method to get total user video
UserSchema.methods.getTotalVideos = async function(id:String){
    return await VideoModel.countDocuments({user:id})
}

//method to get total user subscription

UserSchema.methods.getTotalSubscription = async function(id:String){
    return await SubscriptionModel.countDocument({user:id})
}

UserSchema.virtual("videos", {
    ref:"Video",
    localField:"_id",
    foreignField:"user",
})

UserSchema.set("toJSON",{
    virtuals:true,
    versionKey:false,
    transform:function(doc, ret){
        ret.id = ret._id.toString();
        // delete ret?._id;
        // delete ret?.hash;
    }

});

export default mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);