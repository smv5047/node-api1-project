// implement your API here
//Server Setup
const express = require("express")
let db= require("./data/db")

const app =express()

app.use(express.json())


//Testing Server Routing
app.get("/", (req, res) =>{
    res.send('Hello from Express')    
})

// GET USERS - COMPLETED
app.get("/api/users", (req, res) => {
    db.find()
        .then(data=> {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(500).json({errorMessage: "The users information could not be retrieved." })
        })
})

// GET USER BY ID - COMPLETED
app.get("/api/users/:id", (req, res) => {
    //req.params.id accesses the id from the route

    db.findById(req.params.id)
        .then(data =>{
            if (!data) {
                return res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else{
            return res.status(200).json(data)
            }
        })
        .catch(err => {
            return res.status(500).json({errorMessage: "The user information could not be retrieved."})
        })
    
})

//DELETE USER BY ID 

app.delete("/api/users/:id", (req, res) => {
    // db.remove(req.params.id)
    //     .then(data =>{
    //         if(!data) {
    //             return res.status(404).json({ message: "The user with the specified ID does not exist." })
    //         } else if(res === 1) {
    //             db.findById(req.params.id)
    //                 .then(data=>{
    //                     return res.status(200).json(data)
    //                 })
    //                 .catch(err =>{
    //                     return res.status(500).json( {errorMessage: "The user could not be removed"})
    //                 })
    //         }})
    //     .catch(err =>{
    //             return res.status(500).json( {errorMessage: "The user could not be removed"})
    //     })
    db.findById(req.params.id)
        .then(user => {
            if(user) {
                return db.remove(req.params.id).then(()=>user)
            }
            res.status(404).json({error: "The user with the specified ID does not exist"})
        })
        .then(data => res.json(data))
        .catch(err => {
            res.status(500).json({error: "The user could not be removed"})
        })
})


//View updated screenshot on Desktop


//CREATE USER - COMPLETE

app.post("/api/users", (req, res) =>{
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    }


    db.insert({
        name: req.body.name, 
        bio: req.body.bio
    })
        .then(data =>{
            return res.status(201).json({name: req.body.name,bio: req.body.bio, id: data.id})
        })
        .catch(err =>{
            return res.status(500).json({errorMessage: "There was an error while saving the user to the database" })
        })
    
})

// UPDATE USER 

app.put("/api/users/:id", async (req, res) =>{
    const {name, bio } = req.body
    if (!name || !bio) {
        return res.status(400).json({error: "Please provide name and bio for the user"})
    }

    db.findById(req.params.id)
        .then(user => {
            if(user) {
                return db.update(req.params.id, {name, bio})
            }
            res.status(404).json({error: "The user with the specified ID does not exist"})
        })
        .then(() => db.findById(req.params.id))
        .then(data => res.json(data))
        .catch(err => {
            res.status(500).json({error: "The user information could not be modified"})
        })

        
    // if (!req.body.name && !req.body.bio) {
    //     return res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    // }

    // db.update(req.params.id, {
    //     name: req.body.name,
    //     bio: req.body.bio
    // })
    //     .then(data =>{
    //         if(!data) {
    //             return res.status(404).json({ message: "The user with the specified ID does not exist." })
    //         } else if (!req.body.name || !req.body.bio) {
    //             return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    //         } else {

    //         }
    //     })
    //     .catch(err =>{
    //         return res.status(500).json({errorMessage: "The user information could not be modified."})
    //     })

        //per Jason notes check screenshot on desktop
        //also async await
       

})


//Express Server Setup - COMPLETE
const port = 8001
const host = "127.0.0.1" 

app.listen(port, host, ()=>{
    console.log(`Server running at http://${host}:${port}`)
})

