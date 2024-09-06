const db = require('./db');


// Create Elasticsearch index with mapping
async function createAppointmentIndex() {
    await db.index({
        index: 'appointments',
        id: 'appointments',
        body: {
            mappings: {
                properties: {
                    petid: { type: 'integer' },
                    description: { type: 'text' },
                    date: { type: 'date' },
                    deletedat: { type: 'date' },
                },
            },
        },
    });
}

createAppointmentIndex();
