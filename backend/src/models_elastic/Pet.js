const Sequelize = require('sequelize');
const db = require('./db');

const createPetIndex = async () => {
    await db.index({
        index: 'pets',
        id: 'pets',
        body: {
            mappings: {
                properties: {
                    userid: { type: 'integer' },
                    name: { type: 'text' },
                    species: { type: 'text' },
                    race: { type: 'text' },
                    birthday: { type: 'date' },
                    sex: { type: 'text' },
                    color: { type: 'text' },
                    imageid: { type: 'integer' }
                }
            }
        }
    });
};

createPetIndex()