import { Router } from "express";
import { getAllArticles, readMore, toDeleteArticle, uploadArticle } from "../controllers/article.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/upload").post(
  upload.fields([
    {
      name: "imageArticle",  //code to upload file to cloudinary using middleware
      maxCount: 9000,
    },
  ]),

  uploadArticle
);

router.route("").get(getAllArticles)
router.route("/:articleID").delete(toDeleteArticle)
router.route("/:articleID").get(readMore)

export default router;
