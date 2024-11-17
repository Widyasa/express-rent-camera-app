import {PrismaClient} from "@prisma/client";
import argon2 from 'argon2';
const prisma = new PrismaClient()
export async function adminSeeder() {
    const user = await prisma.users.findUnique({where: {username: 'admin'}})
    if (!user) {
        throw new Error("User with username 'admin' does not exist.");
    }
    await prisma.admins.create({
        data: {
                name: 'admin',
                user_id: user.id
            }
    })
}