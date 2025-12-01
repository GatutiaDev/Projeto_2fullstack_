const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  try {
    const { nome, senha } = req.body;

    
    const usuario = await Usuario.findOne({ nome });
    
    if (!usuario) {
        console.log("Usuário não encontrado no banco");
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
        console.log("Senha incorreta");
        return res.status(401).json({ erro: "Senha incorreta" });
    }

    const payload = { 
        id: usuario._id.toString(),
        nome: usuario.nome 
    };

    const token = jwt.sign(
        payload, 
        'SEU_SEGREDO_SECRETO', 
        { expiresIn: '1h' }
    );

    res.json({ token, nome: usuario.nome });

  } catch (error) {
    console.error("Erro fatal no login:", error);
    res.status(500).json({ erro: "Erro interno: " + error.message });
  }
});

module.exports = router;