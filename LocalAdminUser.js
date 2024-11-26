const mongoose = require('mongoose')

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/proaQualy'
async function main() {
    await mongoose.connect(uri)
    console.log('Connection to MongoDB successful')
}
main().catch(err => console.log('ERROR on connection to MongoDB:', err))

const baseUserSchema = require('./Schemas/baseUserSchema')
const Administrador = require('./Schemas/adminSchema')
const bcrypt = require('bcryptjs')

const adminUser = new Administrador({
    nombre: 'Jesus',
    apellido: 'Cristo',
    dni: 12345678,
    email: 'ibutcher@escuelasproa.edu.ar',
    password: 'proaqualy'
})

adminUser.save()