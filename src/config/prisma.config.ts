import { PrismaClient } from "@prisma/client";
// import { prismaConfigType } from "../types/prismaConfig";

const prisma = new PrismaClient({
  log: [
    { emit: "stdout", level: "query" },
    { emit: "stdout", level: "error" },
    { emit: "stdout", level: "info" },
    { emit: "stdout", level: "warn" },
  ],
});

// prisma.$on("query", (e: prismaConfigType) => {
//     console.log(`query: ${e.query}`);
//     console.log(`Params: ${e.params}`);
//     console.log(`duration: ${e.duration}ms`);
// });

export default prisma;
