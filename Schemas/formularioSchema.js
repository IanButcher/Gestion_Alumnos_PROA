// Modulos
const mongoose = require('mongoose')

const preguntaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true 
    },
    descripcion: {
        type: String, 
        required: true
    },
    porcentaje: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    tipo: {
        type: String,
        required: true,
        enum: ['texto', 'multiple', 'checkbox']
    },
    options: [{
        text: String,
        score: Number
    }]  
})

const formularioSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    questions: [preguntaSchema],  // Array con las preguntas
    
    isActive: {
        type: Boolean,
        default: true
    },
    tipo: {
        type: String,
        enum: ['evaluacion', 'autoevaluacion'],
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// Create and export the Formulario model
const Formulario = mongoose.model('Formulario', formularioSchema)

module.exports = Formulario;
