export interface TransactionInterface extends Request{
    start_date: string
    end_date: string
    customer_id: string
    status: string
    totalAmount: number
    payAmount: number
    user_id: string
    transaction_items: [
        {
            product_id: string
            quantity: number
            price: number
        }
    ]
}