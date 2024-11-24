import express from "express";
import {authRoute} from "./auth.route";
import {authMiddleware} from "../middleware/auth";
import {ProductCategoryRoute} from "./productCategory.route";
import {ProductBrandRoute} from "./productBrand.route";
import {uploadFile} from "../utils/uploadFile";
import {sendResponse} from "../utils/sendResponse";
import {ProductRoute} from "./product.route";
import {adminMiddleware} from "../middleware/admin.middleware";

export const router = express.Router()
router.use('/auth', authRoute)
router.get('/tes', authMiddleware, adminMiddleware)
// router.post('/upload', (req, res) => {
//     uploadFile('1732268590700','public/upload').single("image")
//     if (!req.file) {
//         return sendResponse(res, false, null, "upload failed", 400)
//     } else {
//         const filePath = `public/upload/product/${req.file.filename}`;
//         console.log('File path:', filePath);
//         return sendResponse(res, true, null ,"upload file success" , 200)
//     }
// })

router.use('/product-category', ProductCategoryRoute)
router.use('/product-brand', ProductBrandRoute)
router.use('/product', ProductRoute)