import {
    createProductBrand, deleteProductBrand,
    editProductBrand,
    findProductBrand,
    findProductBrandById
} from "../service/productBrand.service";
import {sendResponse} from "../utils/sendResponse";
import {validationResult} from "express-validator";

export const getAllProductBrand = async (req: any, res: any) => {
    try {
        const productBrand = await findProductBrand(req.query)
        return sendResponse(res, true, productBrand, "fetch product brand success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch product brand failed", 500)
    }
}

export const getProductBrandById = async (req: any, res: any) => {
    try {
        const productBrand = await findProductBrandById(req.params.id)
        return sendResponse(res, true, productBrand, "fetch product brand success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch product brand failed", 500)
    }
}

export const storeProductBrand = async (req: any, res: any) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (errors.isEmpty()) {
            const request = req.body
            const productBrand = await createProductBrand(request)
            return sendResponse(res, true, productBrand, "create product brand success", 201)
        }
        return sendResponse(res, false, errors.array(), 'failed to create product brand', 422);

    } catch (error) {
        return sendResponse(res, false, error, "create product brand failed", 500)
    }
}

export const updateProductBrand = async (req: any, res: any) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (errors.isEmpty()) {
            const request = req.body
            const productBrand = await editProductBrand(req.params.id, request)
            return sendResponse(res, true, productBrand, "update product brand success", 200)
        }
        return sendResponse(res, false, errors.array(), 'failed to create product brand', 422);
    } catch (error) {
        return sendResponse(res, false, error, "create product brand failed", 500)
    }
}

export const destroyProductBrand = async (req:any, res:any) => {
    try {
        const productBrand = await deleteProductBrand(req.params.id)
        return sendResponse(res, true, productBrand, "delete product brand success", 200)
    } catch (error) {
        return sendResponse(res, false, error, 'delete product brand failed', 500)
    }
}