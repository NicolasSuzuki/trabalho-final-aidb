const express = require('express');
const cors = require('cors');
var http = require('http'); 
const User = require('./models/User');
const Pet = require('./models/Pet');

const app = express();
app.use(express.json());
app.use(cors());

  // Rotas Rest
app.get('/', (req, res) => {
    console.log('teste');
    return res.send('Im alive');
}) 


app.post('/register', async (req, res) => {
    await User.create(req.body)
        .then(() => 
            res.json({ 
                erro: false, 
                mensagem: "Usuario cadastrado com sucesso"
            })).catch(() => res.json({ 
                erro: true, 
                mensagem: "Usuario nao cadastrado com sucesso"
            }))
})

app.post('/pet/register', async (req, res) => {
    await Pet.create(req.body)
        .then(() => 
            res.json({ 
                erro: false, 
                mensagem: "Pet cadastrado com sucesso"
            })).catch(() => res.json({ 
                erro: true, 
                mensagem: "Pet cadastrado com sucesso"
            }))
})
const server = http.createServer(app);
server.listen(8080, () => {
    console.log("Server running on port 8080: http://localhost:8080")
});