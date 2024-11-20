import {PrismaClient} from "@prisma/client";
import argon2 from 'argon2';
const prisma = new PrismaClient()
export async function customerSeeder() {
    const user = await prisma.users.findUnique({where: {username: 'customer1'}})
    if (!user) {
        throw new Error("User with username 'customer1' does not exist.");
    }
    await prisma.customers.create({
        data: {
            name: 'customer 1',
            address: 'dalung',
            phone_number: '08123456789',
            user_id: user.id,
        }
    })
}