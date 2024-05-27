import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Article } from "../models/article.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//post request 

const uploadArticle = asyncHandler(async (req, res) => {

  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { title, author, content, industry } = req.body;
  if (
    [title, author, content, industry].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedArticle = await Article.findOne({
    $or: [{ title }],
  });

  if (existedArticle) {
    throw new ApiError(409, "Article with this title already exists");
  }

  const localFilePath = req.files?.imageArticle[0]?.path;


  if (!localFilePath) {
    throw new ApiError(400, "Avatar file is required")

  }

  const imageArticle = await uploadOnCloudinary(localFilePath)

  if (!imageArticle) {
    throw new ApiError(400, "Avatar file is required")
  }

  const article = await Article.create({
    title,
    author,
    content,
    industry,
    imageArticle: imageArticle.url,

  });

  const createdArticle = await Article.findById(article._id)

  if (!createdArticle) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdArticle, "Article uploaded Successfully"));
});



//get request 

const getAllArticles = asyncHandler(async (req, res) => {

  const allArticles = await Article.find({})
  res.status(200).json({ allArticles })

})

const toDeleteArticle = asyncHandler(async (req, res) => {
  const id = (req.params.articleID)
  console.log(typeof (id));

  const data = await Article.deleteOne({ _id: id }).then((result) => {
    console.log(result);
    // res.status(204).json(204, "Article Deleted successfully")
    res.send(result)

  })

})

const readMore = asyncHandler(async (req, res) => {
  const id = (req.params.articleID)
  console.log(id);
  

  const readMoreArticle = await Article.findById({ _id:id })
    res.status(200).json({readMoreArticle})
})

export { uploadArticle };
export { getAllArticles };
export { toDeleteArticle };
export { readMore }