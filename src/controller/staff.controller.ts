import {
    createStaff, deleteStaff,
    editStaff,
    findStaff,
    findStaffById, uploadImage
} from "../service/staff.service";
import {sendResponse} from "../utils/sendResponse";
import {validationResult} from "express-validator";

export const getAllStaff = async (req: any, res: any) => {
    try {
        const staff = await findStaff(req.query)
        return sendResponse(res, true, staff, "fetch staff success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch staff failed", 500)
    }
}

export const getStaffById = async (req: any, res: any) => {
    try {
        const staff = await findStaffById(req.params.id)
        return sendResponse(res, true, staff, "fetch staff success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "fetch staff failed", 500)
    }
}

export const storeStaff = async (req: any, res: any) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (errors.isEmpty()) {
            const request = req.body
            const staff = await createStaff(request)
            return sendResponse(res, true, staff, "create staff success", 201)
        }
        return sendResponse(res, false, errors.array(), 'failed to create staff ', 422);

    } catch (error) {
        return sendResponse(res, false, error, "create staff failed", 500)
    }
}

export const updateStaff = async (req: any, res: any) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (errors.isEmpty()) {
            const request = req.body
            const staff = await editStaff(req.params.id, request)
            return sendResponse(res, true, staff, "update staff success", 200)
        }
        return sendResponse(res, false, errors.array(), 'failed to create staff ', 422);
    } catch (error) {
        return sendResponse(res, false, error, "create staff failed", 500)
    }
}

export const destroyStaff = async (req:any, res:any) => {
    try {
        const staff = await deleteStaff(req.params.id)
        return sendResponse(res, true, staff, "delete staff success", 200)
    } catch (error) {
        return sendResponse(res, false, error, 'delete staff failed', 500)
    }
}

export const storeImage = async (req: any, res: any) => {
    try {
        console.log(req.file)
        if (!req.file) {
            return sendResponse(res, false, null, "upload failed", 400)
        }
        const staff = await uploadImage(req.params.id, req)
        return sendResponse(res, true, staff, "upload image success", 200)
    } catch (error) {
        return sendResponse(res, false, error, "upload image failed", 500)
    }

}
