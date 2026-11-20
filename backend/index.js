require('dotenv').config()
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        app: 'OndePassa',
        status: 'online'
    })
})

app.get('/saudacao', (req, res) => {
    const nome = req.query.nome

    if (!nome) {
        return res.status(400).json({
            mensagem: 'Faltou o nome.'
        })
    }

    res.json({
        texto: `Olá, ${nome}!`
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`Backend do OndePassa no ar. Porta: ${port}.`)
})
