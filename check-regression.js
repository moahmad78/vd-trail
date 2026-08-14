const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRegression() {
  const allLeads = await prisma.lead.findMany({
    select: { id: true, name: true, handledBy: true, status: true, isTrashed: true }
  });
  console.log('Total Leads:', allLeads.length);
  console.table(allLeads);
}

checkRegression().catch(console.error).finally(() => prisma.$disconnect());
