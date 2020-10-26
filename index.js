require('dotenv').config() // uses enviromental variables so heroku doesnt crash
const express = require('express')

const server = express()
const cors = require('cors')
const uuid = require('uuid')
server.use(express.json())
server.use(cors())

//seed data
let dogs = [{
    id:uuid.v4(),
    breed:"German Shepard",
    imageUrl: 'https://en.wikipedia.org/wiki/German_Shepherd#/media/File:German_Shepherd_-_DSC_0346_(10096362833).jpg'
}]

server.get('/dogs',(req,res)=>{
    try{
        res.status(200).json(dogs)
    }
    catch{
        res.status(500).json({errorMessage: "Cannot get DOGS LOL"})
    }
})

server.use('/', (req,res) =>{
    res.status(200).json({message:"Hello THE WORLD"})
})

// const PORT = 5000
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    
})

