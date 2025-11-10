import { PrismaClient } from "@prisma/client";
import { prismaConfigType } from "../types/prismaConfig";

const prismaConfig = new PrismaClient({
  log: [
    { emit: "stdout", level: "query" },
    { emit: "stdout", level: "error" },
    { emit: "stdout", level: "info" },
    { emit: "stdout", level: "warn" },
  ],
});

prismaConfig.$on("query", (e: prismaConfigType) => {
    console.log(`query: ${e.query}`);
    console.log(`Params: ${e.params}`);
    console.log(`duration: ${e.duration}ms`);
});

export default prismaConfig;
