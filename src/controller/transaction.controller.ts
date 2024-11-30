import {
    createTransaction, deleteTransaction,
    editTransaction,
    findTransaction,
    findTransactionById, uploadImage
} from "../service/transaction.service";
import {sendResponse} from "../utils/sendResponse";
import {validationResult} from "express-validator";

export const getAllTransaction = async (req: any, res: any) => {
    try {
        const transaction = await findTransaction(req.query)
        return sendResponse(res, true, transaction, "fetch transaction success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch transaction failed", 500)
    }
}

export const getTransactionById = async (req: any, res: any) => {
    try {
        const transaction = await findTransactionById(req.params.id)
        return sendResponse(res, true, transaction, "fetch transaction success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch transaction failed", 500)
    }
}

export const storeTransaction = async (req: any, res: any) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (errors.isEmpty()) {
            const request = req.body
            const transaction = await createTransaction(res, req)
            return sendResponse(res, true, transaction, "create transaction success", 201)
        }
        return sendResponse(res, false, errors.array(), 'failed to create transaction ', 422);

    } catch (error) {
        return sendResponse(res, false, error, "create transaction failed", 500)
    }
}

export const updateTransaction = async (req: any, res: any) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (errors.isEmpty()) {
            const request = req.body
            const transaction = await editTransaction(res, req.params.id, req)
            return sendResponse(res, true, transaction, "update transaction success", 200)
        }
        return sendResponse(res, false, errors.array(), 'failed to create transaction ', 422);
    } catch (error) {
        return sendResponse(res, false, error, "create transaction failed", 500)
    }
}

export const destroyTransaction = async (req:any, res:any) => {
    try {
        const transaction = await deleteTransaction(res, req.params.id)
        return sendResponse(res, true, transaction, "delete transaction success", 200)
    } catch (error) {
        return sendResponse(res, false, error, 'delete transaction failed', 500)
    }
}

export const storeImage = async (req: any, res: any) => {
    try {
        console.log(req.file)
        if (!req.file) {
            return sendResponse(res, false, null, "upload failed", 400)
        }
        const transaction = await uploadImage(res, req.params.id, req)
        return sendResponse(res, true, transaction, "upload image success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "upload image failed", 500)
    }

}
