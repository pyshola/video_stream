import {INotificationKind} from "../types";
import mongoose, {Schema, Document, Types} from "mongoose";

export interface INotification extends Document{
    message:string;
    isSeen:boolean,
    isRead:boolean;
    kind:INotificationKind;
    sender:Types.ObjectId;
    recipient:Types.ObjectId;
    video:Types.ObjectId;
    comment?:Types.ObjectId

}

const NotificationSchema = new Schema<INotification>(
    {
        message:{type:String, required:true},
        isSeen:{type:Boolean, default:false},
        isRead:{type:Boolean, default:false},
        kind:{type:String, enum:Object.values(INotificationKind), required:true},
        sender:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        recipient:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
        video:{type:mongoose.Schema.Types.ObjectId, ref:"Video", required:true},
        comment:{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}
    },
    {timestamps:true}
) 

NotificationSchema.index({recipient:1, isSeen:1, isRead:1});

NotificationSchema.set("toJSON", {
    virtuals:true,
    versionKey:false,
    transform:function(doc, ret){
        ret.id = ret._id.toString();
        delete ret._id;
    }
}) 