import mongoose, {Schema}  from "mongoose";             

const magazineSchema = new Schema ({ 

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
    industry:{
        type: String,
        enum: ["Manufacturing", "Service", "Financial"]
    },
    magazinePDF:{
        type:String,
        required:true
    },
    coverImage:{
        type:String, // cloudinary url
        required: true,   
    }

}, {timestamps:true})      



export const Magazine = mongoose.model("magazine", magazineSchema)