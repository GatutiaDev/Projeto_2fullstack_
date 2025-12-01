const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');


const app = express();


connectDB(); 


app.use(cors()); 
app.use(express.json());
app.use(compression({ threshold: 0 }));
app.use(morgan('dev')); 
app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.get('/', (req, res) => {
    res.json({ message: "Servidor Online!" });
});

app.use('/api/auth', require('./src/routes/auth'));

app.use('/api/usuarios', require('./src/routes/Usuarios')); 

app.use('/api/personagens', require('./src/routes/Personagem'));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});