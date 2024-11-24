import express from "express";
import {
    destroyProductBrand,
    getAllProductBrand,
    getProductBrandById,
    storeProductBrand, updateProductBrand
} from "../controller/productBrand.controller";
import {productBrandRequest} from "../request/productBrand.request";
import {authMiddleware} from "../middleware/auth";

export const ProductBrandRoute = express.Router();
ProductBrandRoute.get('/', getAllProductBrand)
ProductBrandRoute.get('/:id', getProductBrandById)
ProductBrandRoute.post('/', authMiddleware, productBrandRequest, storeProductBrand)
ProductBrandRoute.patch('/:id', authMiddleware, productBrandRequest, updateProductBrand)
ProductBrandRoute.delete('/:id', authMiddleware, destroyProductBrand)