import {PrismaClient} from "@prisma/client";
import {userSeeder} from "./user.seeder";
import {adminSeeder} from "./admin.seeder";

const prisma = new PrismaClient();

async function seed() {
    await userSeeder()
    await adminSeeder()
}
seed()
.catch((e) => {
    throw e;
})
.finally(async () => {
    await prisma.$disconnect()
})