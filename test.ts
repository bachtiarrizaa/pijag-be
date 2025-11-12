import prisma from "./src/config/prisma.config";

async function main() {
  const tokens = await prisma.blacklistToken.findMany();
  console.log(tokens);
}

main();
