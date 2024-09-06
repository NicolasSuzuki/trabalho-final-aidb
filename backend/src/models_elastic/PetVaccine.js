const db = require('./db');

async function createPetVaccineIndex() {

  await db.index({
    index: 'pet-vaccine',
    id: 'pet-vaccine',
    body: {
      mappings: {
        properties: {
          vaccineid: { type: 'integer' },
          petId: { type: 'integer' },
          vaccinatedat: { type: 'date' },
          createdat: { type: 'date' }
        }
      }
    }
  });
}

// Call this function to create the index if it doesn't exist
createPetVaccineIndex().catch(console.error);