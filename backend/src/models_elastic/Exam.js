const db = require('./db');

async function createExamIndex() {
    await db.index({
        index: 'exams',
        id: 'exams',
        body: {
            mappings: {
                properties: {
                    userid: { type: 'integer' },
                    petId: { type: 'integer' },
                    imageid: { type: 'integer' },
                    date: { type: 'date' }
                }
            }
        }
    });
}

// Call this function to create the index if it doesn't exist
createExamIndex().catch(console.error);
