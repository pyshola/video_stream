import mongoose, {Schema, Document, Types} from "mongoose";
import VideoFavouriteModel from "./VideoFavouriteModel";
import VideoCommentModel from "./VideoCommentModel";
import VideoBookmarkModel from "./VideoBookmarkModel";
import SubscriptionModel from "./SubscriptionModel"

export enum VideoStatus {
    DRAFT = "DRAFT",
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC"
}
export interface IVideo extends Document{
     _id:string;
    videoId:string;
    title:string;
    description:string;
    thumbnail:string;
    tags:string[];
    isReady:boolean;
    status:VideoStatus;
    user:Types.ObjectId;
    shares:number;
    categories:Types.ObjectId[];


    //method
    getTotalLikes(): Promise<number>;
    getTotalSubscriber(): Promise<number>;
    getTotalComments(): Promise<number>;
    getTotalBookmark(): Promise<number>;
    isLiked(user:string): Promise<boolean>;
    isSaved(user:string): Promise<boolean>;
}


const VideoSchema = new Schema<IVideo>(
    {
        videoId:{type:String, unique:true, required:true},
        title:{type:String, default:""},
        description:{type:String, default:""},
        thumbnail:{type:String, default:""},
        tags:{type:[String], default:[]},
        isReady:{type:Boolean, default:false},
        shares:{type:Number, default:0},
        categories:{type:[mongoose.Schema.Types.ObjectId], ref:"Category"},
        status:{
            type:String, enum:Object.values(VideoStatus), default:VideoStatus.DRAFT
        },
        user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},

    },
    {timestamps:true}
)


VideoSchema.methods.getTotalLikes = async function(){
    return await VideoFavouriteModel.countDocuments({video:this._id})
}

VideoSchema.methods.getTotalBookmark = async function(){
    return await VideoBookmarkModel.countDocuments({video:this._id})
}
VideoSchema.methods.getTotalSubscriber = async function(){
    return await SubscriptionModel.countDocuments({toUser:this.user})
}

VideoSchema.methods.getTotalComments = async function(){
    return await VideoCommentModel.countDocuments({video:this._id})
}

VideoSchema.methods.isLiked = async function(userId:string){
    if(!userId) return false;
    return !!(await VideoFavouriteModel.exists({user:userId,video:this._id }))
}

VideoSchema.methods.isSaved = async function(userId:string){
    if(!userId) return false;
    return !!(await VideoBookmarkModel.exists({user:userId,video:this._id }))
}

VideoSchema.index({title:"text", description:"text"})

VideoSchema.set('toJSON', {
    virtuals:true,
    versionKey:false,
    transform:function(doc, ret){
        ret.id = ret._id.toString();
        // delete ret._id;
        // delete ret.hash;
        // if(ret.user && typeof ret.user === 'object'){
        //     ret.user = ret.user.toString()

        // }
    }
})

export default mongoose.models?.Video || mongoose.model<IVideo>("Video", VideoSchema)