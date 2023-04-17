import express from 'express'
import cors from 'cors'
import  {getUser, login , register, getPublicEvents, getUserEvents} from './database.js'

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
    res.send(user)
})


app.post("/api/register", async (req, res) => {
  const {username, password, email, firstname, lastname, university_id, user_level} = req.body;
  if (!username || !password || !email || !firstname || !lastname || !university_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const user = await register(firstname, lastname, user_level, username, password, email, university_id) 
  if (user === undefined){
    res.status(500).send();
  }
  res.status(200).send(user)
})


app.get("/api/publicevents", async (req,res) => {
  const events = await getPublicEvents()
  console.log(events);
  res.status(201).send(events)
}) 


app.get("/api/userevents/:id",async(req,res)=>{
  console.log(req.params.id)
  const events = await getUserEvents(req.params.id)
  console.log(events);
  res.status(201).send(events)
})
