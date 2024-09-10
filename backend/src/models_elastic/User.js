const db = require('./db');

async function createUserIndex() {
    db.index({
        index: 'users',
        id: 'users',
        body: {
            mappings: {
                properties: {
                    name: { type: 'text' },
                    email: { type: 'keyword' },
                    password: { type: 'text' },
                    is_admin: { type: 'boolean' },
                    token: { type: 'keyword' }
                }
            }
        }
    });
}

createUserIndex();
