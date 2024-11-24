import {NextFunction} from "express";
import {sendResponse} from "../utils/sendResponse";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()
export const adminMiddleware = (req: any, res: any, next: NextFunction) => {
    const user = req.userData

    try {
        if (req.userData.data.role === "admin") {
            return sendResponse(res, true, null, 'kamu admin', 200)
        }
        return sendResponse(res, true, null, "you're not an admin", 401)
    } catch (error) {
        return sendResponse(res, false, error, '', 401)
    }
}