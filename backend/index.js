require('dotenv').config()
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`
    },
    params: {
        language: 'pt-BR'
    }
})


function simplificarFilme(filme) {
    return {
        id: filme.id,
        titulo: filme.title,
        ano: filme.release_date 
            ? filme.release_date.substring(0, 4) 
            : null,
        nota: Number(filme.vote_average.toFixed(1)),
        poster: filme.poster_path
            ? `https://image.tmdb.org/t/p/w342${filme.poster_path}`
            : null
    }
}


app.get('/', (req, res) => {
    res.json({
        app: 'OndePassa',
        status: 'online'
    })
})

app.get('/em-alta', (req, res) => {
    tmdbClient.get('/trending/movie/week')

        .then(resultado => {
            const filmes = resultado.data.results.map(simplificarFilme)
            res.json(filmes)
        })
        .catch(erro => {
            console.log(erro)
            res.status(502).json({
                mensagem: 'Não foi possível consultar o catálogo de filmes.'
            })
        })
})

app.get('/filmes', (req, res) => {
    const busca = req.query.busca

    if (!busca || !busca.trim()) {
        return res.status(400).json({
            mensagem: 'Informe o título de um filme.'
        })
    }

    const termo = busca.trim()
    console.log(`Busca: ${termo}`)

    tmdbClient.get('/search/movie', {
        params: {
            query: termo,
            include_adult: false
        }
    })
        .then(resultado => {
            const filmes = resultado.data.results.map(simplificarFilme)
            res.json(filmes)
        })
        .catch(erro => {
            console.log(erro)
            res.status(502).json({
                mensagem: 'Não foi possível consultar o catálogo de filmes.'
            })
        })

})


const port = 3000
app.listen(port, () => {
    console.log(`Backend do OndePassa no ar. Porta: ${port}.`)
})
