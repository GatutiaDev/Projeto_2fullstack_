const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');


router.post('/cadastro', async (req, res) => {
  try {
    const novoUsuario = await Usuario.create(req.body);
    
    res.status(201).json({ 
      mensagem: "Usuário criado!", 
      id: novoUsuario._id 
    });

  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

module.exports = router;