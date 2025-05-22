import {RequestGetAll} from "../types/requestGetAll";
import {createPaginator} from "prisma-pagination";
import {Prisma, Transaction} from "@prisma/client";
import {prisma} from "../utils/prisma";
import {sendResponse} from "../utils/sendResponse";

export const findTransaction = async (request: RequestGetAll) => {
    const paginate = createPaginator({ perPage: 10 });
    try {
        return await paginate<Transaction, Prisma.TransactionFindManyArgs>(
            prisma.transaction,
            {
                where: {
                    start_date: request.search,
                    end_date: request.search,
                    status: request.search,
                    payment_status: request.search,
                },
                include: {
                    user: true,
                    customer: true,
                }
            },
            {
                page: request.page
            }
        );
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const findTransactionById = async (id: string) => {
    try {
        return await prisma.transaction.findFirst({
            where: { id },
            include: {
                user: true,
                customer: true
            }
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};

const isProductBooked = async (startDate: string, endDate: string, items: any) => {
    const productIds = items.map((item: { product_id: any; }) => item.product_id);

    const bookedProducts = await prisma.transaction.findMany({
        where: {
            status: {
                in: ["on_going", "paid"]
            },
            start_date: {
                lte: endDate
            },
            end_date: {
                gte: startDate
            },
            transaction_items: {
                path: '$[*].product_id',
                array_contains: productIds
            }
        },
        select: {
            transaction_items: true
        }
    });

    const bookedProductIds = new Set(
        bookedProducts.flatMap(transaction => transaction.transaction_items.map((item: any) => item.product_id))
    );

    return items.map((item: { product_id: string; }) => ({
        product_id: item.product_id,
        isBooked: bookedProductIds.has(item.product_id)
    }));
};

export const createTransaction = async (response: any, req: any) => {
    try {
        const availability = await isProductBooked(req.start_date, req.end_date, req.transaction_items);

        const unavailableProducts = availability.filter((item: { isBooked: any; }) => item.isBooked);
        if (unavailableProducts.length > 0) {
            console.error("Produk berikut sudah dibooking:", unavailableProducts);
            return sendResponse(response, false, unavailableProducts, 'failed to create transaction', 400);
        }

        const transaction = await prisma.transaction.create({
            data: {
                start_date: req.start_date,
                end_date: req.end_date,
                customer_id: req.customer_id,
                status: 'pending',
                payment_status: req.payment_status,
                totalAmount: req.totalAmount,
                payAmount: req.payAmount,
                user_id: req.userData.data.id,
                transaction_items: req.transaction_items
            }
        });

        return transaction;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const editTransaction = async (id: string, req: any, response: any) => {
    try {
        const availability = await isProductBooked(req.start_date, req.end_date, req.transaction_items);

        const unavailableProducts = availability.filter((item: { isBooked: any; }) => item.isBooked);
        if (unavailableProducts.length > 0) {
            console.error("Produk berikut sudah dibooking:", unavailableProducts);
            return sendResponse(response, false, unavailableProducts, 'failed to update transaction', 400);
        }

        const transactionData = await prisma.transaction.findFirst({ where: { id } });
        if (transactionData?.status !== 'pending') {
            return sendResponse(response, false, null, 'transaction status is not pending', 400);
        }

        const transaction = await prisma.transaction.update({
            where: { id },
            data: {
                start_date: req.start_date,
                end_date: req.end_date,
                customer_id: req.customer_id,
                status: 'pending',
                totalAmount: req.totalAmount,
                payAmount: req.payAmount,
                transaction_items: req.transaction_items
            }
        });

        return transaction;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteTransaction = async (id: string, response: any) => {
    try {
        const transactionData = await prisma.transaction.findFirst({ where: { id } });
        if (transactionData?.status === 'pending') {
            return await prisma.transaction.delete({ where: { id } });
        }
        return sendResponse(response, false, null, 'transaction status is not pending', 400);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const uploadImage = async (id: string, request: any, response: any) => {
    try {
        const transaction = await prisma.transaction.findFirst({ where: { id } });
        if (transaction?.status === 'pending') {
            const filePath = `upload/transaction/${request.file.filename}`;
            return await prisma.transaction.update({
                where: { id },
                data: {
                    payment_proof: filePath
                }
            });
        }
        return sendResponse(response, false, null, 'transaction status is not pending', 400);
    } catch (error) {
        console.log(error);
        return error;
    }
};