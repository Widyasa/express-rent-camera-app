import {body} from "express-validator";

export const registerRequest = [
        body('username', 'Username is required').exists().notEmpty(),
        body('email', 'invalid email').isEmail().notEmpty(),
        body('password', 'Password minimum is 8').isLength({min: 8}),
        body('password', 'password is required').notEmpty(),
        body('password_confirmation').custom((value, {req}) => {
            return value === req.body.password
        }),
        body('password_confirmation', 'confirm password is required').notEmpty(),
        body('name').notEmpty().isString(),
        body('phone_number').notEmpty(),
        body('address').notEmpty().isString()
]
