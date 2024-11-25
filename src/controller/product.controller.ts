import {
    createProduct, deleteProduct,
    editProduct,
    findProduct,
    findProductById, uploadImage
} from "../service/product.service";
import {sendResponse} from "../utils/sendResponse";
import {validationResult} from "express-validator";

export const getAllProduct = async (req: any, res: any) => {
    try {
        const product = await findProduct(req.query)
        return sendResponse(res, true, product, "fetch product success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch product failed", 500)
    }
}

export const getProductById = async (req: any, res: any) => {
    try {
        const product = await findProductById(req.params.id)
        return sendResponse(res, true, product, "fetch product success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch product failed", 500)
    }
}

export const storeProduct = async (req: any, res: any) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (errors.isEmpty()) {
            const request = req.body
            const product = await createProduct(request)
            return sendResponse(res, true, product, "create product  success", 201)
        }
        return sendResponse(res, false, errors.array(), 'failed to create product ', 422);

    } catch (error) {
        return sendResponse(res, false, error, "create product  failed", 500)
    }
}

export const updateProduct = async (req: any, res: any) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (errors.isEmpty()) {
            const request = req.body
            const product = await editProduct(req.params.id, request)
            return sendResponse(res, true, product, "update product  success", 200)
        }
        return sendResponse(res, false, errors.array(), 'failed to create product ', 422);
    } catch (error) {
        return sendResponse(res, false, error, "create product  failed", 500)
    }
}

export const destroyProduct = async (req:any, res:any) => {
    try {
        const product = await deleteProduct(req.params.id)
        return sendResponse(res, true, product, "delete product  success", 200)
    } catch (error) {
        return sendResponse(res, false, error, 'delete product  failed', 500)
    }
}

export const storeImage = async (req: any, res: any) => {
    try {
        console.log(req.file)
        if (!req.file) {
            return sendResponse(res, false, null, "upload failed", 400)
        }
        const product = await uploadImage(req.params.id, req, res)
            return sendResponse(res, true, product, "upload image success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "create product  failed", 500)
    }

}
