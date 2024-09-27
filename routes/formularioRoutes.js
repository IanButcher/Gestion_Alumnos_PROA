// Modulos
const express = require('express')
const app = express()
const router = express.Router()
const Formulario = require('../Schemas/formularioSchema')
const mongoose = require('mongoose')
app.use(express.urlencoded({ extended: true }))

// GET route --> Display all Formularios
router.get('/formularios', async (req, res) => {
    try {
        const formularios = await Formulario.find()
        res.render('forms/formularios', { formularios: formularios })
        console.log(formularios)
    } catch (error) {
        console.error('Error fetching formularios:', error)
        res.status(500).send('Internal Server Error')
    }
})

// GET route --> Show form to create a new Formulario
router.get('/formularios/new', (req, res) => {
    res.render('forms/new') 
})

router.get('/formularios/preview/:id', async (req, res)=>{
    const { id } = req.params
    const formulario = await Formulario.findById(id)
    if (formulario) {
        res.render('forms/update', { formulario })
    } else {
        res.status(404).send('No se encontro el formulario');
    }
    
})

// POST route --> save/insert Formulario
router.post('/formularios/save-form', async (req, res) => {
    try {
        // Extraer toda la informacion de
        const { 'form-title': titulo, ...formData } = req.body

        // Procesar preguntas
        const questions = []

        let questionIndex = 1;
        while (formData[`question${questionIndex}`]) {
            const question = {
                titulo: formData[`question${questionIndex}`],  // (preguntaSchema.titulo)
                descripcion: formData[`description${questionIndex}`],  // (preguntaSchema.descripcion)
                porcentaje: formData[`percentage${questionIndex}`],  //  (preguntaSchema.porcentaje)
                tipo: formData[`type${questionIndex}`], // (preguntaSchema.tipo)
                options: []
            };

            // Tipo multiple o checkbox
            if (question.tipo === 'multiple' || question.tipo === 'checkbox') {
                let optionIndex = 1;
                while (formData[`option${questionIndex}_${optionIndex}`]) {
                    question.options.push(formData[`option${questionIndex}_${optionIndex}`]);
                    optionIndex++;
                }
            }

            // Sumar al array
            questions.push(question);
            questionIndex++;
        }

        // Crear instancia Formulario 
        const newFormulario = new Formulario({
            titulo,  
            questions  
        });

        // Save the Formulario to the database
        await newFormulario.save()

        // Redirect to the formularios list after saving
        res.redirect('/formularios')
    } catch (error) {
        console.error('Error saving formulario:', error)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;
