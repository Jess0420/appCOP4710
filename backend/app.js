import express from 'express'
import cors from 'cors'
import  {getUser, login , register, getPublicEvents, getUserEvents, getUniversities, getSingleEvent, getEventComments, getEventsByRSO, joinRSO, createPublicevent, createRSOEvent, createUniEvent, checkAdmin} from './database.js'

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


app.get("/api/event/:id",async(req,res)=>{
  console.log(req.params.id)
  const events = await getSingleEvent(req.params.id)
  if (events === undefined){
    res.status(404).send();
  }
  res.status(201).send(events)
})

app.get("/api/eventcomments/:id",async(req,res)=>{
  console.log(req.params.id)
  const event_comments = await getEventComments(req.params.id)
  if (event_comments === undefined){
    res.status(404).send();
  }
  res.status(201).send(event_comments)
})

app.get("/api/allrsos",async(req,res)=>{
  const rsos = await getEventComments(req.params.id)
  if (rsos === undefined){
    res.status(404).send();
  }
  res.status(201).send(rsos)
})

app.get("/api/eventcomments/:id",async(req,res)=>{
  const event_comments = await getEventComments(req.params.id)
  if (event_comments === undefined){
    res.status(404).send();
  }
  res.status(201).send(event_comments)
})


app.get("/api/universities", async (req,res) => {
  try{
    const universities = await getUniversities()
    res.status(200).send(universities);
  }catch(err){
    console.log(err)
    res.status(500).send()
  }
}) 

app.get('/api/rsoevents/:id' , async (req,res) => {
    const rsoevents = await getEventsByRSO()
    if(rsoevents === undefined){
      res.status(404).send();
    }
    res.status(201).send(rsoevents);
})

// API endpoint to join an existing RSO
app.post('/api/joinrso', (req, res) => {
  const { rsoId, userId } = req.body;
  const result = joinRSO(rsoId, userId)    
  if(result === undefined){
    res.status(500).send();
  }
  res.status(201).send(result);
})

// API endpoint to create a new RSO
app.post('/api/createrso', (req, res) => {
  const { name, email, admin_username } = req.body;

  // Find university domain from admin email
  const domain = email.split('@')[1];

});
app.post('/api/createevent', (req, res) => {
  const { user_id, event_name,  category, description, time, date, location_name, contact_phone, contact_email, is_public, host_university , rsoId, is_approved} = req.body;

  if(!user_id || !event_name || !category || !description || !time || !date || !location_name || !contact_phone || !contact_email || !is_public){
    res.status(400).send('Missing required fields');
    return;
  }
  if(checkAdmin(user_id) === undefined){
    return res.status(401).json({ message: 'User is not an admin' });
  }

  if(!rsoId){
    const result = createUniEvent(event_name,  category, description, time, date, location_name, contact_phone, contact_email, is_public, host_university )
    res.status(201).send(result);
  }
  if(!host_university){
    const result = createRSOEvent(event_name,  category, description, time, date, location_name, contact_phone, contact_email,rsoId, is_approved )
    res.status(201).send(result);
  }
  if(!rsoId && !host_university){
    const result = createPublicEvent(event_name,  category, description, time, date, location_name, contact_phone, contact_email )
    res.status(201).send(result);
    return;
  }

});