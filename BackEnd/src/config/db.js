const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/', {
            
            maxPoolSize: 10, 
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000,
        });
        console.log('MongoDB conectado com Pool de Conexões configurado!');
    } catch (err) {
        console.error('Erro ao conectar:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;