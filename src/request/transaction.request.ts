import {body} from "express-validator";

export const transactionRequest = [
    body('start_date', 'start date is required').notEmpty(),
    body('start_date', 'start date must be date').isDate().notEmpty(),
    body('end_date', 'end date must be date').isDate(),
    body('end_date', 'end date is required').notEmpty(),
    body('customer_id', 'customer data is required').notEmpty(),
    body('customer_id', 'customer data is required').notEmpty(),
    body('totalAMount', 'total amount data is required').notEmpty(),
    body('payAMount', 'customer data is required').notEmpty(),
    body('payment_status', 'payment status is required').notEmpty(),
    body('transaction_items', 'transaction items must be array').isArray(),
    body('transaction_items','transaction items is required').notEmpty(),
    body('transaction_items.*.product_id', 'product id is required').notEmpty(),
    body('transaction_items.*.quantity', 'quantity is required').notEmpty(),
    body('transaction_items.*.price', 'price is required').notEmpty(),
    body('transaction_items.*.quantity', 'quantity must be a number').isNumeric(),
    body('transaction_items.*.price', 'price must be a number').isNumeric(),

]
