const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL'iniz
  credentials: true
})); 