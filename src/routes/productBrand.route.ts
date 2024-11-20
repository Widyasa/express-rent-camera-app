import express from "express";
import {
    destroyProductBrand,
    getAllProductBrand,
    getProductBrandById,
    storeProductBrand, updateProductBrand
} from "../controller/productBrand.controller";
import {productBrandRequest} from "../request/productBrand.request";

export const ProductBrandRoute = express.Router();
ProductBrandRoute.get('/', getAllProductBrand)
ProductBrandRoute.get('/:id', getProductBrandById)
ProductBrandRoute.post('/', productBrandRequest, storeProductBrand)
ProductBrandRoute.patch('/:id', productBrandRequest, updateProductBrand)
ProductBrandRoute.delete('/:id', destroyProductBrand)