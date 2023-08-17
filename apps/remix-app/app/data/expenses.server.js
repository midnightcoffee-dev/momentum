import { prisma } from "./database.server.js";

export async function addExpense(expense, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expense.title,
        amount: +expense.amount,
        date: new Date(expense.date),
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to add expense");
  }
}

export async function getExpenses(userId) {
  try {
    return await prisma.expense.findMany({
      where: { userId },
      orderBy: {
        date: "desc",
      },
    });
  } catch (error) {
    throw new Error("Failed to get expenses");
  }
}

export async function getExpense(id) {
  try {
    return await prisma.expense.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error("Failed to get expense");
  }
}

export async function updateExpense(id, expense) {
  try {
    return await prisma.expense.update({
      where: {
        id,
      },
      data: {
        title: expense.title,
        amount: +expense.amount,
        date: new Date(expense.date),
      },
    });
  } catch (error) {
    throw new Error("Failed to update expense");
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete expense");
  }
}
