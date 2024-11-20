import {body} from "express-validator";

export const productBrandRequest =
    [
        body('name', 'name is required').exists().notEmpty(),
    ]