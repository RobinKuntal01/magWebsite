import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"


cloudinary.config({ 
  cloud_name: 'du7m2qhgt', 
  api_key: 943829419471826, 
  api_secret: 'BDXnEUAi0RjxCwjJyLXMIokfU9Y'
});

const uploadOnCloudinary = async (localFilePath) => {
  
    
    try {
       
        
        if (!localFilePath) return null 
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)

        return response;

    } catch (error) {
        console.log('error while uploading:', error.message);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}