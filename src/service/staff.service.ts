import {RequestGetAll} from "../types/requestGetAll";
import {createPaginator} from "prisma-pagination";
import {Prisma, Staffs} from "@prisma/client";
import {prisma} from "../utils/prisma";
import {Staff} from "../types/staff";
import argon2 from "argon2";


export const findStaff = async (request:RequestGetAll) => {
    const paginate = createPaginator({perPage:10})
    try {
        return await paginate<Staffs, Prisma.StaffsFindManyArgs>(
            prisma.staffs,
            {
                where: {
                    name: request.search,
                    phone_number: request.search,
                    address: request.search,
                },
                include: {
                    user: true,

                }
            },
            {
                page: request.page
            }
        )
    } catch (error) {
        console.log(error)
        return error
    }
}

export const findStaffById = async (id:string) => {
    try {
        return await prisma.staffs.findFirst({
            where: {id},
            include: {
                user: true,
            }
        })
    } catch(error) {
        console.log(error)
        return error
    }

}

export const createStaff = async (request:Staff) => {
    try {
        const password = await argon2.hash(request.password)
        const user = await prisma.users.create({
            data: {
                email: request.email,
                password: password,
                username: request.username,
                role: "staff",
            }
        })
        return await prisma.staffs.create({
            data: {
                name: request.name,
                address: request.address,
                phone_number:request.phone_number,
                user_id: user.id
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const editStaff = async (id:string, request:Staff) => {
    try {
        const staff = await prisma.staffs.update({
            where: {id},
            data: {
                name: request.name,
                address: request.address,
                phone_number:request.phone_number,
                updated_at: new Date().toISOString()
            }
        })
        await prisma.users.update({
            where: {id: staff.user_id},
            data: {
                email: request.email,
                username: request.username,
            }
        })
        return staff
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteStaff  = async (id:string) => {
    try {
        const staff = await prisma.staffs.delete({where: {id}})
        await prisma.users.delete({
            where: {
                id: staff.user_id
            }
        })
        return staff
    } catch (error) {
        console.log(error)
        return error
    }
}

export const uploadImage = async (id:string, request:any) => {
    try {
        const filePath = `upload/staff/${request.file.filename}`
        return await prisma.staffs.update({
            where: {id},
            data: {
                image: filePath
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}