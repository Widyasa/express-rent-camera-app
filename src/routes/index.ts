import express from "express";
import {authRoute} from "./auth.route";
import {ProductCategoryRoute} from "./productCategory.route";
import {ProductBrandRoute} from "./productBrand.route";
import {ProductRoute} from "./product.route";
import {StaffRoute} from "./staff.route";

export const router = express.Router()
router.use('/auth', authRoute)
router.use('/product-category', ProductCategoryRoute)
router.use('/product-brand', ProductBrandRoute)
router.use('/product', ProductRoute)
router.use('/staff', StaffRoute)