const db = require('./db');

async function createVaccineIndex() {
    await db.index({
        index: 'vaccines',
        id: 'vaccines',
        body: {
            mappings: {
                properties: {
                    name: { type: 'text' },
                    vaccineid: { type: 'integer' },
                }
            }
        }
    });
}

createVaccineIndex();
