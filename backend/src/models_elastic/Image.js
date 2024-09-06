const Sequelize = require("sequelize");
const db = require("./db");

async function createImageIndex() {
    await db.index({
      index: 'images',
      id: 'images',
      body: {
        mappings: {
          properties: {
            type: { type: 'keyword' },
            name: { type: 'text' },
            data: { type: 'text' }  // Assumindo que os dados da imagem sejam armazenados como base64
          }
        }
      }
    }); // Ignora o erro de índice já existente
}

createImageIndex();
