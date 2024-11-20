import express from "express";
import {
    getAllProductCategory,
    getProductCategoryById,
    storeProductCategory, updateProductCategory
} from "../controller/productCategory.controller";
import {productCategoryRequest} from "../request/productCategory.request";

export const ProductCategoryRoute = express.Router();
ProductCategoryRoute.get('/', getAllProductCategory)
ProductCategoryRoute.get('/:id', getProductCategoryById)
ProductCategoryRoute.post('/', productCategoryRequest, storeProductCategory)
ProductCategoryRoute.patch('/:id', productCategoryRequest, updateProductCategory)