const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Usa a variável de ambiente PORT ou a porta 3000 como padrão

// Configura a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota padrão para servir o `index.html`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});
