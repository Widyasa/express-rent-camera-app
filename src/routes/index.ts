import express from "express";
import {authRoute} from "./auth.route";
import {authMiddleware} from "../middleware/auth";
import {ProductCategoryRoute} from "./productCategory.route";

export const router = express.Router()
router.use('/auth', authRoute)

router.use('/product-category', authMiddleware, ProductCategoryRoute)