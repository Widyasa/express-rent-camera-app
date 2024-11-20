import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from "body-parser";
import {router} from "./routes";
import {sendResponse} from "./utils/sendResponse";
const app = express()
dotenv.config()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)
app.use((req, res, next) => {
    return sendResponse(res, false, null, "Routes not Found", 404)
})

app.listen(port, () => {
    console.log('Listening on port', port)
})

