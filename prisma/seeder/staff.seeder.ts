import {PrismaClient} from "@prisma/client";
import argon2 from 'argon2';
const prisma = new PrismaClient()
export async function staffSeeder() {
    const user = await prisma.users.findUnique({where: {username: 'staff1'}})
    if (!user) {
        throw new Error("User with username 'staff1' does not exist.");
    }
    await prisma.staffs.create({
        data: {
            name: 'staff 1',
            address: 'dalung',
            phone_number: '08123456789',
            image:'image.png',
            user_id: user.id,
        }
    })
}