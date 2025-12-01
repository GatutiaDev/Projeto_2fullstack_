const express = require('express');
const router = express.Router();
const Personagem = require('../models/Personagem');
const auth = require('../config/auth');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 });

router.get('/busca', auth, async (req, res) => {
    try {
        const { nome } = req.query;
        if (!nome) return res.status(400).json({ erro: "Digite um nome" });

        const key = `busca_${nome.toLowerCase()}`;
        const cachedData = cache.get(key);

        if (cachedData) {
            console.log(`Cache: ${nome}`); 
            return res.json(cachedData);
        }

        
        const personagem = await Personagem.findOne({ 
            name: { $regex: nome, $options: 'i' } 
        });

        if (!personagem) return res.status(404).json({ erro: "Personagem não encontrado no seu banco." });

        cache.set(key, personagem);

        res.json(personagem);
    } catch (error) {
        res.status(500).json({ erro: "Erro interno" });
    }
});




router.post('/', auth, async (req, res) => {
    try {
        
        const novo = await Personagem.create({
            ...req.body,
            usuarioCriador: req.usuarioId 
        });
        res.status(201).json(novo);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

module.exports = router;