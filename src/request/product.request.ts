import {body} from "express-validator";

export const productRequest =
    [
        body('name', 'name is required').exists().notEmpty(),
        body('price', 'price is required').exists().notEmpty(),
        body('price', 'price data must a number').isNumeric(),
        body('code', 'code is required').exists().notEmpty(),
        body('status', 'status is required').exists().notEmpty(),
        body('category_id', 'category data is required').exists().notEmpty(),
        body('brand_id', 'brand data is required').exists().notEmpty(),

    ]