import {PrismaClient} from "@prisma/client";
import argon2 from 'argon2';
const prisma = new PrismaClient()
export async function userSeeder() {
    const hashedPassword = await argon2.hash('123456')

    await prisma.users.createMany({
        data: [
            {
                username: 'admin',
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin'
            },
            {
                username: 'staff1',
                email: 'staff1@gmail.com',
                password: hashedPassword,
                role: 'staff'
            },
            {
                username: 'customer1',
                email: 'customer1@gmail.com',
                password: hashedPassword,
                role: 'customer'
            }
        ]
    })

}