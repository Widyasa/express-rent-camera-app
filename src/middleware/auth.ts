import {NextFunction} from "express";
import {sendResponse} from "../utils/sendResponse";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()
export const authMiddleware = (req: any, res: any, next: NextFunction) => {
    const {authorization} = req.headers
    if (!authorization) {
        return sendResponse(res, false, null, "Token not found", 401)
    }
    const token = authorization.split(' ')[1]
    const secret = process.env.JWT_SECRET!

    try {
        req.userData = jwt.verify(token, secret)
    } catch (error) {
        return sendResponse(res, false, error, '', 401)
    }
    next()
}