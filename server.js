const express = require('express');
const path = require('path');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configura a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do cliente PostgreSQL usando variável de ambiente
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://bdpg_rtm_user:ktnMLQ6qNRkvCrY3EpRTttigxFMreHsp@dpg-ctuubfhu0jms73aq73ag-a.oregon-postgres.render.com:5432/bdpg_rtm',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect().then(() => {
  console.log('Conectado ao banco de dados PostgreSQL');
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
});

// Endpoint para buscar dados de acordo com o código passado
app.get('/estado/:codigo', async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const result = await client.query('SELECT * FROM tbauto WHERE codigo = $1', [codigo]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Estado não encontrado');
    }
  } catch (err) {
    console.error('Erro ao buscar dados do banco de dados:', err);
    res.status(500).send('Erro ao buscar dados do banco de dados');
  }
});

// Rota padrão para servir o `index.html`
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});
