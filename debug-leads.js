const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debugDB() {
  const leads = await prisma.lead.findMany();
  console.log('Total leads:', leads.length);
  
  const handledByStats = {};
  
  leads.forEach(l => {
    let key = l.handledBy === null ? 'ACTUAL_NULL' : (l.handledBy === '' ? 'EMPTY_STRING' : l.handledBy);
    if (!handledByStats[key]) handledByStats[key] = { count: 0, examples: [] };
    handledByStats[key].count++;
    if (handledByStats[key].examples.length < 3) {
      handledByStats[key].examples.push({ id: l.id, name: l.name });
    }
  });

  console.log('handledBy Distribution:');
  console.dir(handledByStats, { depth: null });
}
debugDB().catch(console.error).finally(() => prisma.$disconnect());
