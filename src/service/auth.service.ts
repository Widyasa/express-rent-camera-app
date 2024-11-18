import {prisma} from "../utils/prisma";
import {NextFunction} from "express";
import {sendResponse} from "../utils/sendResponse";
import argon2 from "argon2";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import {Register} from "../types/register";
import {validationResult} from "express-validator";
dotenv.config()
const findUserCredentials = async (email: string) => {
    const findUser = await prisma.users.findUnique({where: {email}});
    if (!findUser) {
        return {success: false, message: 'user not found'}
    }
    return {success: true, user: findUser};
}
export const loginService = async (res:any, email: string, password: string) => {
    const loginData = await findUserCredentials(email)
    if (!loginData.success || !loginData.user) {
        return sendResponse(res, false, null, loginData.message || 'user not found', 403)
    }
    const passwordValidation = await argon2.verify(loginData.user.password, password)
    const expiredToken:number = 60 * 60 * 72
    if (passwordValidation) {
        const token = jwt.sign({
            data: {
                id: loginData.user.id,
                username: loginData.user.username,
                role: loginData.user.role,
                email: loginData.user.email
            }
        }, process.env.JWT_SECRET!, {expiresIn: expiredToken})
        const returnSuccess = {
            data: {
                id: loginData.user.id,
                username: loginData.user.username,
                role: loginData.user.role,
                email: loginData.user.email
            },
            token: token
        }
        return sendResponse(res, true, returnSuccess, 'login success', 200)
    } else {
        return sendResponse(res, false, null, loginData.message || 'invalid password', 403)
    }
}

export const registerService = async (res:any, request:Register) => {
    const hashedPassword = await argon2.hash(request.password)
    try {
        const errors = validationResult(request); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
            return sendResponse(res, false, errors.array(), 'failed to create user', 422);
        }
        const findUser = await prisma.users.findUnique({
            where: {
                email: request.email,
                username: request.username
            }
        })
        if (findUser) {
            return sendResponse(res, false, null, 'User does exist, change your email and username', 403)
        }
        const resUser = await prisma.users.create({
            data: {
                username: request.username,
                email: request.email,
                password: hashedPassword,
                role: 'customer'
            }
        })
        const resCustomer = await prisma.customers.create({
            data: {
                name: request.name,
                phone_number: request.phone_number,
                address: request.address,
                user_id: resUser.id
            }
        })
        const returnValue = {
            resCustomer,
            resUser
        }
        return sendResponse(res, true, returnValue, 'Register success', 201)

    } catch (e) {
        console.log(e)
        return sendResponse(res, false, null, "Register Failed", 500)
    }

}