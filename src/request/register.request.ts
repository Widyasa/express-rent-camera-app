import {body} from "express-validator";

export const registerRequest = () => {
    return [
        body('username', 'Username is required').exists().notEmpty(),
        body('email', 'Email is required').isEmail().exists().notEmpty(),
        body('password', 'Password is required').isLength({min: 8}).notEmpty(),
        body('password_confirmation').custom((value, {req}) => {
            return value === req.body.password
        }).notEmpty(),
        body('name').notEmpty().isString(),
        body('phone_number').notEmpty(),
        body('address').notEmpty().isString(),
    ]
}