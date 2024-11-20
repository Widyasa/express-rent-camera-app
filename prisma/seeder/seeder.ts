import {PrismaClient} from "@prisma/client";
import {userSeeder} from "./user.seeder";
import {adminSeeder} from "./admin.seeder";
import {customerSeeder} from "./customer.seeder";
import {staffSeeder} from "./staff.seeder";

const prisma = new PrismaClient();

async function seed() {
    await userSeeder()
    await adminSeeder()
    await customerSeeder()
    await staffSeeder()
}
seed()
.catch((e) => {
    throw e;
})
.finally(async () => {
    await prisma.$disconnect()
})