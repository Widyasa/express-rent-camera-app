import express from "express";
import {
    destroyProductCategory,
    getAllProductCategory,
    getProductCategoryById,
    storeProductCategory, updateProductCategory
} from "../controller/productCategory.controller";
import {productCategoryRequest} from "../request/productCategory.request";
import {authMiddleware} from "../middleware/auth";

export const ProductCategoryRoute = express.Router();
ProductCategoryRoute.get('/', getAllProductCategory)
ProductCategoryRoute.get('/:id', getProductCategoryById)
ProductCategoryRoute.post('/', authMiddleware, productCategoryRequest, storeProductCategory)
ProductCategoryRoute.patch('/:id', authMiddleware, productCategoryRequest, updateProductCategory)
ProductCategoryRoute.delete('/:id', authMiddleware, destroyProductCategory)