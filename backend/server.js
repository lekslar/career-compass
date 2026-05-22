const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/professions', require('./routes/professions'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/assistant', require('./routes/assistant'));

const PORT = 8000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));