import {loginService, registerService} from "../service/auth.service";
import {NextFunction} from "express";

export const login = (req:any, res:any) => {
    const { email, password } = req.body;
    return loginService(res, email, password)
}

export const register = (req:any, res:any) => {
    return registerService(res, req.body)
}