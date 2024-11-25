import {NextFunction} from "express";
import {sendResponse} from "../utils/sendResponse";
import dotenv from "dotenv";

dotenv.config()
export const adminMiddleware = (req: any, res: any, next: NextFunction) => {
    try {
        if (req.userData.data.role === "admin") {
           return next()
        }
        return sendResponse(res, true, null, "you're not an admin", 401)
    } catch (error) {
        return sendResponse(res, false, error, '', 401)
    }
}