import express from 'express'
import cors from 'cors'
import  {getUser} from './database.js' 
import { login } from './database.js'

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 8080 ;


app.use( (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(PORT, () => {
    console.log("server running on port 8080")
})

app.get("/api/v1/:id", async (req,res) => {
    const id  = req.params.id
    const user = await getUser(id)
    res.send(user)
}) 

app.post("/api/login", async (req, res) => {
    const username = req.body.username 
    const password = req.body.password 
    const user = await login(username, password) 
    if (user == undefined){
      res.status(404).send();
    }
    res.status(200).send(user)
})
