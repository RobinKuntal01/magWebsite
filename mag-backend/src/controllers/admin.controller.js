import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import {uploadOnCloudinary} from "../utils/cloudinary.js"

const generateAccessAndRefereshTokens = async(adminId) =>{
  try {
      const admin = await Admin.findById(adminId)
      const accessToken = admin.generateAccessToken()
      const refreshToken = admin.generateRefreshToken()

      adminId.refreshToken = refreshToken
      await admin.save({ validateBeforeSave: false })

      return {accessToken, refreshToken}


  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }

}

const registerAdmin = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res



  const { username, email, fullName, password } = req.body;
  console.log("email: ", email);

  if (
    [ username, email, fullName,  password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // if (!avatarLocalPath) {
  //     throw new ApiError(400, "Avatar file is required")
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath)
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  // if (!avatar) {
  //     throw new ApiError(400, "Avatar file is required")

  // }

  const admin = await Admin.create({
    username,
    email,
    fullName,
    password
    //avatar: avatar.url,
    //coverImage: coverImage?.url || "",
   
  });

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  if (!createdAdmin) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdAdmin, "Admin registered Successfully"));
});



const loginAdmin = asyncHandler(async (req, res) =>{
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  
  const {email, password} = req.body

  //Here is an alternative of above code based on logic discussed in video:
  if (!(email)) {
      throw new ApiError(400, "email is required")
  }

  const admin = await Admin.findOne({
      $or: [ {email}]
  })

  if (!admin) {
      throw new ApiError(404, "User does not exist")
  }

 const isPasswordValid = await admin.isPasswordCorrect(password)

 if (!isPasswordValid) {
  throw new ApiError(401, "Invalid user credentials")
  }



//generating access token n refresh token

  const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(admin._id)

  const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
      new ApiResponse(
          200, 
          {
              admin: loggedInAdmin, accessToken, refreshToken
          },
          "User logged In Successfully"
      )
  )

})


const logoutAdmin = asyncHandler(async(req, res) => {
  await Admin.findByIdAndUpdate(
      req.admin._id,
      {
          $unset: {
              refreshToken: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))
})



const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
  }

  try {
      const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
      )
  
      const admin = await Admin.findById(decodedToken?._id)
  
      if (!admin) {
          throw new ApiError(401, "Invalid refresh token")
      }
  
      if (incomingRefreshToken !== admin?.refreshToken) {
          throw new ApiError(401, "Refresh token is expired or used")
          
      }
  
      const options = {
          httpOnly: true,
          secure: true
      }
  
      const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(admin._id)
  
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
          new ApiResponse(
              200, 
              {accessToken, refreshToken: newRefreshToken},
              "Access token refreshed"
          )
      )
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
  }

})






export { registerAdmin, loginAdmin, refreshAccessToken, logoutAdmin };
