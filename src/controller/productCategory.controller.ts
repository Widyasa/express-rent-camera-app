import {
    createProductCategory, deleteProductCategory,
    editProductCategory,
    findProductCategory,
    findProductCategoryById
} from "../service/productCategory.service";
import {sendResponse} from "../utils/sendResponse";
import {validationResult} from "express-validator";

export const getAllProductCategory = async (req: any, res: any) => {
    try {
        const productCategory = await findProductCategory(req.query)
        return sendResponse(res, true, productCategory, "fetch product category success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch product category failed", 500)
    }
}

export const getProductCategoryById = async (req: any, res: any) => {
    try {
        const productCategory = await findProductCategoryById(req.params.id)
        return sendResponse(res, true, productCategory, "fetch product category success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch product category failed", 500)
    }
}

export const storeProductCategory = async (req: any, res: any) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (errors.isEmpty()) {
            const request = req.body
            const productCategory = await createProductCategory(res, request)
            return sendResponse(res, true, productCategory, "create product category success", 201)
        }
        return sendResponse(res, false, errors.array(), 'failed to create product category', 422);

    } catch (error) {
        return sendResponse(res, false, error, "create product category failed", 500)
    }
}

export const updateProductCategory = async (req: any, res: any) => {
    try {
        const request = req.body
        const productCategory = editProductCategory(res, req.params.id, request)
        return sendResponse(res, true, productCategory, "update product category success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "create product category failed", 500)
    }
}

export const destroyProductCategory = async (req:any, res:any) => {
    try {
        const productCategory = deleteProductCategory(req.params.id)
        return sendResponse(res, true, productCategory, "delete product category success", 200)
    } catch (error) {
        return sendResponse(res, false, error, 'delete product category failed', 500)
    }
}