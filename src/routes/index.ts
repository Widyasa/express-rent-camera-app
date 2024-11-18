import express from "express";
import {authRoute} from "./auth.route";

export const router = express.Router()
router.use('/auth', authRoute)