import {loginService, registerService} from "../service/auth.service";
import {NextFunction} from "express";
import {validationResult} from "express-validator";
import {sendResponse} from "../utils/sendResponse";

export const login = (req:any, res:any) => {
    const { email, password } = req.body;
    return loginService(res, email, password)
}

export const register = (req:any, res:any) => {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (errors.isEmpty()) {
        return registerService(res, req.body)
    }
    return sendResponse(res, false, errors.array(), 'failed to create user', 422);
}