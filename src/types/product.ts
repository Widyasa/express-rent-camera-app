import {ProductStatus} from "@prisma/client";

export interface Product {
    id: string
    name: string
    price: number
    code: string
    status: ProductStatus
    category_id: string
    brand_id:string
    image:string
}