import mysql from 'mysql2'
import dotenv from 'dotenv'


dotenv.config()
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export async function getUsers(){
    const [result] =  await pool.query('SELECT * FROM users');
    return result;
}

export async function getUser(username, password){
    const [user] = await pool.query(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password])
    return user[0] // returns undefined if no user found
}

export async function login(username, password){
    const [user] = await pool.query(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password])
    return user[0] // returns undefined if no user found
}

export async function createUser(user_level, username, password, email){
    let date = new Date();
    let now =  date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    const result = await pool.query(`
    INSERT INTO users(user_level, username, password, email, created_at)
    VALUES (? , ? , ? , ? ,?)` , [user_level, username, password,email,now])
    return result
}

export async function getPublicEvents(){
    const [events] = await pool.query(`SELECT * FROM events WHERE is_public = true`)
    return events // returns undefined if no events found
}


export async function getUserEvents(user_id){
    const [events] = await pool.query(`SELECT * FROM events WHERE is_public = 1 
        OR (host_university = (SELECT university_id FROM users WHERE user_id = ?) AND is_public = 0)  
        OR (rso_id IN (SELECT rso_id FROM rso_memberships WHERE user_id = ?)   AND is_public = 0)`, [user_id,user_id])
       return events 
}
