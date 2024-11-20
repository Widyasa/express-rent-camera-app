import {body} from "express-validator";

export const productCategoryRequest =
     [
        body('name', 'name is required').exists().notEmpty(),
    ]