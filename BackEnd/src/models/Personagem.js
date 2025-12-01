const mongoose = require('mongoose');


const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    unlock: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true }
});

const PersonagemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    vision: { type: String, required: true },
    weapon: { type: String, required: true },
    gender: { type: String, required: true },
    nation: { type: String, required: true },
    rarity: { type: Number, required: true },
    constellation: { type: String, required: true },
    description: { type: String, required: true },

    
    skillTalents: { type: [SkillSchema], required: true },

    id: String,

    usuarioCriador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = mongoose.model('Personagem', PersonagemSchema);
