import express from 'express'
import  {getUser} from './database.js' 
import { login } from './database.js'

const app = express()

app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log("server running on port 8080")
})

app.get("/api/v1/:id", async (req,res) => {
    const id  = req.params.id
    const user = await getUser(id)
    res.send(notes)
}) 

app.post("/login", async (req, res) => {
    const username = req.params.username 
    const password = req.params.password 
    const user = await login(username, password) 
    res.send(notes)
})
