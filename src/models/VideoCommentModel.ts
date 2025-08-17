import mongoose, {Schema, Document, Types} from "mongoose";

export interface IComment extends Document{
    user:Types.ObjectId;
    video:Types.ObjectId;
    content:string;
    createdAt:Date;
    updatedAt:Date;
}

const CommentSchema = new Schema<IComment>(
    {
        user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        video:{type:mongoose.Schema.Types.ObjectId, ref:"Video", required:true},
        content:{type:String, required:true, trim:true}
    },
    {timestamps:true}
)
CommentSchema.index({user:1, video:1});

CommentSchema.set("toJSON", {
    virtuals:true,
    versionKey:false,
    transform:function(doc, ret){
        // ret.id = ret._id.toString();
        // delete ret._id;
        // if(ret.user){
        //     if(typeof ret.user === 'object' && ret.user?._id){

        //     }
        // }
    }
})
export default mongoose.models?.Comment || mongoose.model<IComment>("Comment", CommentSchema);