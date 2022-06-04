const { response } = require('express')
const express = require('express')
const app =express()
const PORT = 8000




app.get(' / ', (request,response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get( '/api' , (req , res )=>{
    response.json()
})

app.listen(PORT,()=>{
    console.log(`The server is now running  on port ${PORT}! Betta Go Catch Ii!`)
})