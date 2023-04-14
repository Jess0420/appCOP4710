import express from 'express'
import  {getUser, getUsers, createUser} from './database.js'

const app = express()

app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log("server running on port 8080")
})

app.post('/api/v1/login', async (req, res) => {
    const {username , password } = req.body
    const user = await getUser(username,password)
    console.log(user)
    if (user) {
      res.send(user)
    } else {
      res.status(401).send('Invalid username or password')
    }
  })
  
app.post('/api/v1/register', async (req, res) => {
    const {user_level, username, password, email } = req.body
    const user = await registerUser(user_level, username, password, email)
    if (user) {
      res.send(user)
    } else {
      res.status(500).send('Failed to register user')
    }
})
