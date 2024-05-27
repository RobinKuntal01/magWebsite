import mongoose, {Schema}  from "mongoose";             

const articleSchema = new Schema ({ 

    title: {
        type:String,
        required: true,
        trim: true,
        uppercase: true,
        index: true
    },
    author: {
        type:String,
        required: true,
        trim: true,
        index: true
    },
    content:{
        type:String,
        required: true,
        trim: true
    },
    industry:{
        type: String,
        enum: ["Manufacturing", "Service", "Financial"]
    },
    imageArticle:{
        type:String, // cloudinary url
        required: true,
        
    }

}, {timestamps:true})      



export const Article = mongoose.model("article", articleSchema)