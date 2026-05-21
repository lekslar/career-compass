const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/professions', require('./routes/professions'));
app.use('/api/quiz', require('./routes/quiz'));

const PORT = 8000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));