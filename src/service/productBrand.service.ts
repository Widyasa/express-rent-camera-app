import {RequestGetAll} from "../types/requestGetAll";
import {createPaginator} from "prisma-pagination";
import {Prisma, ProductBrand} from "@prisma/client";
import {prisma} from "../utils/prisma";

export const findProductBrand = async (request:RequestGetAll) => {
    const paginate = createPaginator({perPage:10})
    try {
        return await paginate<ProductBrand, Prisma.ProductBrandFindManyArgs>(
            prisma.productBrand,
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

export const findProductBrandById = async (id:string) => {
    try {
        return await prisma.productBrand.findFirst({where: {id}})
    } catch(error) {
        console.log(error)
        return error
    }

}

export const createProductBrand = async (request:ProductBrand) => {
    try {
        return await prisma.productBrand.create({
            data: {
                name: request.name
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const editProductBrand = async (id:string, request:ProductBrand) => {
    try {
        return await prisma.productBrand.update({
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

export const deleteProductBrand  = async (id:string) => {
    try {
        return await prisma.productBrand.delete({where: {id}})
    } catch (error) {
        console.log(error)
        return error
    }
}