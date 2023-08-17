import { PrismaClient, Role, PurchaseStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const numberOfUsers = 50;
  const sanityCourseId = "5783d365-faa2-43ae-8c40-6bee9b385c88"; // Sanity Course ID

  // Create users
  for (let i = 0; i < numberOfUsers; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: Role.USER,
      },
    });
  }

  // Create Purchase and CourseEnrollment for each user
  const users = await prisma.user.findMany();
  for (const user of users) {
    await prisma.purchase.create({
      data: {
        userId: user.id,
        sanityCourseId: sanityCourseId,
        pricePaid: parseFloat(faker.commerce.price()),
        status:
          Object.values(PurchaseStatus)[
            Math.floor(Math.random() * Object.values(PurchaseStatus).length)
          ], // Random status
      },
    });

    await prisma.courseEnrollment.create({
      data: {
        userId: user.id,
        sanityCourseId: sanityCourseId,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
