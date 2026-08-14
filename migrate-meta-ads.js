const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrateMetaAds() {
  try {
    const metaLeads = await prisma.lead.findMany({
      where: { source: 'Meta Ads' }
    });
    
    console.log(`Found ${metaLeads.length} leads with source 'Meta Ads'`);
    
    if (metaLeads.length > 0) {
      const result = await prisma.lead.updateMany({
        where: { source: 'Meta Ads' },
        data: { source: 'Facebook' }
      });
      console.log(`Successfully migrated ${result.count} leads to 'Facebook'`);
    } else {
      console.log('No migration needed.');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateMetaAds();
