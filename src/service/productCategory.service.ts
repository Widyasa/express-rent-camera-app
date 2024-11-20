import {RequestGetAll} from "../types/requestGetAll";
import {createPaginator} from "prisma-pagination";
import {Prisma, ProductCategory} from "@prisma/client";
import {prisma} from "../utils/prisma";

export const findProductCategory = async (request:RequestGetAll) => {
    const paginate = createPaginator({perPage:10})
    try {
        return await paginate<ProductCategory, Prisma.ProductCategoryFindManyArgs>(
            prisma.productCategory,
            {
                where: {
                    name: request.search
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

export const findProductCategoryById = async (id:string) => {
    try {
        return await prisma.productCategory.findFirst({where: {id}})
    } catch(error) {
        console.log(error)
        return error
    }

}

export const createProductCategory = async (request:ProductCategory) => {
    try {
        return await prisma.productCategory.create({
            data: {
                name: request.name
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const editProductCategory = async (id:string, request:ProductCategory) => {
    try {
        return await prisma.productCategory.update({
            where: {id},
            data: {
                name: request.name,
                updated_at: new Date().toISOString()
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteProductCategory  = async (id:string) => {
    try {
        return await prisma.productCategory.delete({where: {id}})
    } catch (error) {
        console.log(error)
        return error
    }
}