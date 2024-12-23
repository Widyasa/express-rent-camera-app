import {RequestGetAll} from "../types/requestGetAll";
import {createPaginator} from "prisma-pagination";
import {Prisma, Product} from "@prisma/client";
import {prisma} from "../utils/prisma";

export const findProduct = async (request:RequestGetAll) => {
    const paginate = createPaginator({perPage:10})
    try {
        return await paginate<Product, Prisma.ProductFindManyArgs>(
            prisma.product,
            {
                where: {
                    name: request.search,
                    code: request.search,
                    price: request.search,
                    status: request.search
                },
                include : {
                    brand: true,
                    category: true
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

export const findProductById = async (id:string) => {
    try {
        return await prisma.product.findFirst({
            where: {id},
            include: {
                brand: true,
                category: true
            }
        })
    } catch(error) {
        console.log(error)
        return error
    }

}

export const createProduct = async (request:Product) => {
    try {
        return await prisma.product.create({
            data: {
                name: request.name,
                price:request.price,
                code:request.code,
                status:request.status,
                category_id:request.category_id,
                brand_id: request.brand_id
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const editProduct = async (id:string, request:Product) => {
    try {
        return await prisma.product.update({
            where: {id},
            data: {
                name: request.name,
                price:request.price,
                code:request.code,
                status:request.status,
                category_id:request.category_id,
                brand_id: request.brand_id,
                updatedAt: new Date().toISOString()
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteProduct  = async (id:string) => {
    try {
        return await prisma.product.delete({where: {id}})
    } catch (error) {
        console.log(error)
        return error
    }
}

export const uploadImage = async (id:string, request:any) => {
    try {
            const filePath = `upload/product/${request.file.filename}`
            return await prisma.product.update({
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