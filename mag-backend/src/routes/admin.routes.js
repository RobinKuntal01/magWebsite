import { Router } from "express";
import { registerAdmin } from "../controllers/admin.controller.js";
import { loginAdmin } from "../controllers/admin.controller.js";
import { logoutAdmin } from "../controllers/admin.controller.js";
//import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
//   upload.fields([
//     {
//       name: "avatar",  //code to upload file to cloudinary using middleware
//       maxCount: 1,
//     },
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//   ]),

  registerAdmin
);


router.route("/login").post(loginAdmin);
router.route("/logout").post(verifyJWT,logoutAdmin);

export default router;
