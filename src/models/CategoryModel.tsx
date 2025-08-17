import mongoose, {Schema, Document, Types} from "mongoose";
import {connectDatabase} from "@/lib/db";

export interface ICategory extends Document{
    name:string; // Assuming category has a name
    description:string; // Assuming category has a description
}

const CategorySchema = new Schema<ICategory>(
    {
        name:{type:String, required:true, unique:true, trim:true},
        description:{type:String, default:""}
    },
    {timestamps:true}
)

const CategoryModel =  mongoose.models?.Category || mongoose.model<ICategory>("Category", CategorySchema);

const category = [
    {name:"Technology", description:"All about technology"},
    {name:"Health", description:"Health and wellness topics"},
    {name:"Education", description:"Educational content and resources"},
    {name:"Entertainment", description:"Movies, music, and entertainment news"},
    {name:"Sports", description:"Latest sports news and updates"},
    {name:"Lifestyle", description:"Lifestyle tips and trends"},
    {name:"Travel", description:"Travel guides and tips"},
    {name:"Food", description:"Recipes and food-related content"},
    {name:"Finance", description:"Financial advice and news"},
    {name:"Fashion", description:"Fashion trends and tips"},
    {name:"Gaming", description:"Video games and gaming news"},
    {name:"Science", description:"Scientific discoveries and news"},
    {name:"Art", description:"Art and culture topics"},
    {name:"Music", description:"Music news and reviews"},
    {name:"Automotive", description:"Cars and automotive news"},
    {name:"Politics", description:"Political news and discussions"},
    {name:"Environment", description:"Environmental issues and news"},
];

(async () => {
    await connectDatabase();
    const count = await CategoryModel.countDocuments();
    if(count === 0){
        await CategoryModel.insertMany(category);
        console.log("Categories seeded successfully");
    } else {
        console.log("Categories already exist, skipping seed");
    }
})();

export default CategoryModel;