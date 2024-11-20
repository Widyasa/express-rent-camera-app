import express from "express";
import {authRoute} from "./auth.route";
import {authMiddleware} from "../middleware/auth";
import {ProductCategoryRoute} from "./productCategory.route";
import {ProductBrandRoute} from "./productBrand.route";

export const router = express.Router()
router.use('/auth', authRoute)

router.use('/product-category', authMiddleware, ProductCategoryRoute)
router.use('/product-brand', authMiddleware, ProductBrandRoute)