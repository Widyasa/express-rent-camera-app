import express from "express";
import {
    destroyProduct,
    getAllProduct,
    getProductById, storeImage,
    storeProduct, updateProduct
} from "../controller/product.controller";
import {productRequest} from "../request/product.request";
import {uploadFile} from "../utils/uploadFile";
import {sendResponse} from "../utils/sendResponse";
import {authMiddleware} from "../middleware/auth";

export const ProductRoute = express.Router();
ProductRoute.get('/', getAllProduct)
ProductRoute.get('/:id', getProductById)
ProductRoute.post('/', authMiddleware, productRequest, storeProduct)
ProductRoute.patch('/:id', authMiddleware, productRequest, updateProduct)
ProductRoute.delete('/:id', authMiddleware, destroyProduct)
// ProductRoute.post('/upload/:id',uploadFile(req.params.id, 'public/upload/product').single("image"), storeImage)
ProductRoute.post('/upload/:id', authMiddleware, (req, res, next) => {
    const id = req.params.id;
    return uploadFile(id, 'public/upload/product').single('image')(req, res, next);
}, storeImage);