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
//So gets go in front of posts
server.get('/dogs',(req,res)=>{
    try{
        res.status(200).json(dogs)
    }
    catch{
        res.status(500).json({errorMessage: "Cannot get DOGS LOL"})
    }
})

server.get('/dogs/:id',(req,res)=>{
    const { id } = req.params
    const findDogById = dog => {
        return dog.id == id
    }
    const foundDog = dogs.find(findDogById)
    if(!foundDog){
        res.status(400).json({errorMessage:"cant find ID"})
    }
    else{
        res.json(foundDog)
    }
})

//add a new dog
// same with axios posting this is the server side which it expects when you are posting
server.post('/dogs',(req,res)=> {
    const newDog = req.body
    if(!(newDog.breed)){
        res.status(400).json({errorMessage:"Please make sure you have a breed"})
    }try{
        const notNew = dogs.find(dog=> dog.breed === req.body.breed)
        if(!notNew){
            newDog.id = uuid.v4()
            dogs.push(newDog)
            res.status(201).json({errorMessage: "Added a new Dog",newDog})
        }
        else{
            res.status(400).json({errorMessage: "404 Dog already found"})
        }
    }
    catch{
        res.status(500).json({errorMessage:"Make Server plz"})
    }

})


//Important to call the before your use or else your app wont read /dogs

server.use('/', (req,res) =>{
    res.status(200).json({message:"Hello THE WORLD"})
})

// const PORT = 5000
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    
})

