const Sequelize = require('sequelize');
const db = require('./db');

async function createResultIndex() {
    await client.indices.create({
        index: 'results',
        body: {
            mappings: {
                properties: {
                    imageId: { type: 'integer' },
                    petId: { type: 'integer' },
                    appointmentId: { type: 'integer' },
                    updatedAt: { type: 'date' }
                }
            }
        }
    });
}

createResultIndex();