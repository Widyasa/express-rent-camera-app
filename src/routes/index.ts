import express from "express";
import {authRoute} from "./auth.route";
import {authMiddleware} from "../middleware/auth";
import {ProductCategoryRoute} from "./productCategory.route";
import {ProductBrandRoute} from "./productBrand.route";
import {uploadFile} from "../utils/uploadFile";
import {sendResponse} from "../utils/sendResponse";

export const router = express.Router()
router.use('/auth', authRoute)
router.post('/upload', uploadFile.single("image"), (req, res) => {
    if (!req.file) {
        return sendResponse(res, false, null, "upload failed", 400)
    } else {
        const filePath = `public/upload/${req.file.filename}`;
        console.log('File path:', filePath);
        return sendResponse(res, true, null ,"upload file success" , 200)
    }
})

router.use('/product-category', authMiddleware, ProductCategoryRoute)
router.use('/product-brand', authMiddleware, ProductBrandRoute)