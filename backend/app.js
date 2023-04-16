import express from 'express'
import  {getPublicEvents, getUserEvents, login} from './database.js'

const app = express()

app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log("server running on port 8080")
})

app.post("/login", async (req, res) => {
    const username = req.params.username 
    const password = req.params.password 
    const user = await login(username, password) 
    res.send(user)
})


app.post("/register", async (req, res) => {
  const username = req.body.username 
  const password = req.body.password 
  const user = await login(username, password) 
  res.send(user)
})
app.get("/api/v1/publicevents", async (req,res) => {
  const events = await getPublicEvents()
  console.log(events);
  res.status(201).send(events)
}) 


app.get("/api/v1/userevents/:id",async(req,res)=>{
  console.log(req.params.id)
  const events = await getUserEvents(req.params.id)
  console.log(events);
  res.status(201).send(events)
})