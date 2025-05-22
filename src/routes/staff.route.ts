    import express from "express";
    import {
        destroyStaff,
        getAllStaff,
        getStaffById, storeImage,
        storeStaff, updateStaff
    } from "../controller/staff.controller";
    import {staffRequest} from "../request/staff.request";
    import {uploadFile} from "../utils/uploadFile";
    import {authMiddleware} from "../middleware/auth";
    import {adminMiddleware} from "../middleware/admin.middleware";

    export const StaffRoute = express.Router();
    StaffRoute.get('/', authMiddleware, adminMiddleware, getAllStaff)
    StaffRoute.get('/:id', authMiddleware, adminMiddleware, getStaffById)
    StaffRoute.post('/', authMiddleware, adminMiddleware, staffRequest, storeStaff)
    StaffRoute.patch('/:id', authMiddleware, adminMiddleware, staffRequest, updateStaff)
    StaffRoute.delete('/:id', authMiddleware, adminMiddleware, destroyStaff)
    StaffRoute.post('/upload/:id', authMiddleware, adminMiddleware, (req, res, next) => {
        const id = req.params.id;
        return uploadFile(id, 'public/upload/staff').single('image')(req, res, next);
    }, storeImage);