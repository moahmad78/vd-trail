const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addTestLeads() {
  await prisma.lead.createMany({
    data: [
      {
        name: 'Old Website Lead 1',
        mobileNumber: '1111111111',
        requirement: 'Interior Design',
        submissionSource: 'Contact Page',
        source: 'Website',
        handledBy: null
      },
      {
        name: 'Old Website Lead 2',
        mobileNumber: '2222222222',
        requirement: 'Modular Kitchen',
        submissionSource: 'Header Popup',
        source: 'Website',
        handledBy: null
      },
      {
        name: 'Old Website Lead 3',
        mobileNumber: '3333333333',
        requirement: 'Wardrobe',
        submissionSource: 'Footer Form',
        source: 'Website',
        handledBy: null
      }
    ]
  });
  console.log('Added 3 unassigned website leads.');
}
addTestLeads().catch(console.error).finally(() => prisma.$disconnect());
