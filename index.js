const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const newspapers = [
    {
        name: 'politika',
        address: 'https://www.politika.rs/sr/rubrika/8/sport',
    },
    {
        name: 'mondo',
        address: 'https://mondo.rs/Sport/Fudbal',
    },
    {
        name: 'danas',
        address: 'https://www.danas.rs/rubrika/sport/',
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then (response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('h3,a,h2,h1 *:contains("dobr")', html).each (function() {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url,
                    source: newspaper.name
                })
            })


            })
})

app.get('/', (req, res) => {
    res.json('Welcome to WC Predictions API')
})



app.get('/tabela', (req, res) => {

res.json(articles)
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))