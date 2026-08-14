const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDB() {
  const leads = await prisma.lead.findMany({
    select: { id: true, name: true, handledBy: true }
  });
  console.log('Total leads:', leads.length);
  const unassigned = leads.filter(l => !l.handledBy || l.handledBy === 'Unassigned' || l.handledBy === '');
  console.log('Unassigned leads (JS filter):', unassigned.length);
  unassigned.forEach(l => console.log('- id:', l.id, 'name:', l.name, 'handledBy:', l.handledBy));

  const apiQuery = await prisma.lead.findMany({
    where: {
      OR: [
        { handledBy: null },
        { handledBy: 'Unassigned' },
        { handledBy: '' }
      ]
    }
  });
  console.log('Unassigned leads (Prisma OR query):', apiQuery.length);
}
checkDB().catch(console.error).finally(() => prisma.$disconnect());
