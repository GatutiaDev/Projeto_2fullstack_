const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        console.log("Falha: Sem header Authorization");
        return res.status(401).json({ erro: "Token não fornecido." });
    }

    
    const token = authHeader.replace('Bearer ', '');

    try {
        
        const decoded = jwt.verify(token, 'SEU_SEGREDO_SECRETO');

        
        req.usuarioId = decoded.id;

        if (!req.usuarioId) {
             console.log("ALERTA: O campo 'id' não existe dentro do token!");
        }

        next();
        
    } catch (err) {
        console.log("Erro ao verificar token:", err.message);
        res.status(400).json({ erro: "Token inválido." });
    }
};