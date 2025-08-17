import mongoose, {Schema, Document, Types} from "mongoose";

export interface IVideoHistory extends Document{
    user:Types.ObjectId;
    video:Types.ObjectId;
}

const VideoHistorySchema = new Schema<IVideoHistory>(
    {
        user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        video:{type:mongoose.Schema.Types.ObjectId, ref:"Video", required:true}
    },
    {timestamps:true}
)

export default mongoose.models?.VideoHistory || mongoose.model<IVideoHistory>("VideoHistory", VideoHistorySchema);