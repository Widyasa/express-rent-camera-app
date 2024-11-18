import express from "express";
import {login, register} from "../controller/auth.controller";
import {registerRequest} from "../request/register.request";

export const authRoute = express.Router()
authRoute.post('/register', registerRequest(), register)
authRoute.post('/login', login)