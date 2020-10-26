const express = require('express')

const server = express()

server.use(express.json())

server.use('/', (req,res) =>{
    res.status(200).json({message:"Hello THE WORLDz"})
})

const PORT = 5000

server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    
})