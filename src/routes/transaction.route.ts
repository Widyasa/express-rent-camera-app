import express from "express";
import {
    destroyTransaction,
    getAllTransaction,
    getTransactionById, storeImage,
    storeTransaction, updateTransaction
} from "../controller/transaction.controller";
import {transactionRequest} from "../request/transaction.request";
import {uploadFile} from "../utils/uploadFile";
import {authMiddleware} from "../middleware/auth";
import {adminMiddleware} from "../middleware/admin.middleware";

export const TransactionRoute = express.Router();
TransactionRoute.get('/', authMiddleware, adminMiddleware, getAllTransaction)
TransactionRoute.get('/:id', authMiddleware, adminMiddleware, getTransactionById)
TransactionRoute.post('/', authMiddleware, adminMiddleware, transactionRequest, storeTransaction)
TransactionRoute.patch('/:id', authMiddleware, adminMiddleware, transactionRequest, updateTransaction)
TransactionRoute.delete('/:id', authMiddleware, adminMiddleware, destroyTransaction)
TransactionRoute.post('/upload/:id', authMiddleware, adminMiddleware, (req, res, next) => {
    const id = req.params.id;
    return uploadFile(id, 'public/upload/transaction').single('image')(req, res, next);
}, storeImage);