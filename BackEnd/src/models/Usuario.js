const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome é obrigatório"],
        unique: true
    },
    senha: {
        type: String,
        required: [true, "A senha é obrigatória"]
    }
});


UsuarioSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});


UsuarioSchema.methods.validarSenha = async function(senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);