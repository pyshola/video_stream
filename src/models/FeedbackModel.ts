import mongoose, {Schema, Document, Types} from "mongoose";

export interface IFeedback extends Document{
    user:Types.ObjectId;
    rating:number; // Assuming rating is a number
    comment:string; // Assuming comment is a string
}

const FeedbackSchema = new Schema<IFeedback>(
    {
        user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        rating:{type:Number, required:true, min:1, max:5}, // Example rating range from 1 to 5
        comment:{type:String, required:true, trim:true}
    },
    {timestamps:true}
)

export default mongoose.models?.Feedback || mongoose.model<IFeedback>("Feedback", FeedbackSchema);