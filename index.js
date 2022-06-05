const { response } = require('express')
const express = require('express')
const axios = require('axios')
const cheerio =require ('cheerio')
const PORT = 8000
const app = express()


const newspapers = [
    {
        name: 'Observer',
        address: 'https://www.jamaicaobserver.com/',
        base: 'https://www.jamaicaobserver.com/',
    },
    {
        name: 'Gleaner',
        address: 'https://jamaica-gleaner.com/',
        base: 'https://jamaica-gleaner.com',
    },
    {
        name: 'Jamaica Star',
        address: 'http://jamaica-star.com/news',
        base: 'http://jamaica-star.com/news',
    },
    {
        name: 'Loop Jamaica',
        address:
            'https://jamaica.loopnews.com/category/loopjamaica-jamaica-news',
        base: 'https://jamaica.loopnews.com/',
    },
]

const articles = []
let search = 'man'
newspapers.forEach((newspaper) => {
        axios.get(newspaper.address).then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            $(`a:contains(${search})`, html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title: title.replace(/\s\s+/g, ' '),
                    url: newspaper.base + url,                    source: newspaper.name,
                })
            })
        })
    })

app.get('/' , (req , res) => {
    res.json('Welcome to my api')
})

app.get('/api/',(req,res)=>{
    res.json(articles)
    
})




app.listen(PORT,()=>{
    console.log(`The server is now running  on port ${PORT}! Betta Go Catch Ii!`)
})