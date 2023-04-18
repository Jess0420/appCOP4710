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

export async function register(firstname, lastname, user_level, username, password, email, university_id){
    const [new_user] = await pool.query(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, email])
    console.log(new_user[0])
    if(new_user[0] === undefined){
        let date = new Date();
        let now =  date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        const result = await pool.query(`
        INSERT INTO users(firstname, lastname, user_level, username, password, email, university_id, created_at)
        VALUES (? , ? , ? , ? ,?, ?, ? , ?)` , [firstname, lastname, user_level, username, password,email,university_id, now])
        return result
    }
    return undefined
}

export async function createUser(firstname, lastname, user_level, username, password, email, university_id){
    let date = new Date();
    let now =  date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    const result = await pool.query(`
    INSERT INTO users(firstname, lastname, user_level, username, password, email, university_id, created_at)
    VALUES (? , ? , ? , ? ,?, ?, ? , ?)` , [firstname, lastname, user_level, username, password,email,university_id, now])
    return result
}

export async function joinRSO(rsoId, userId){
    const joinRsoQuery = `INSERT INTO rso_memberships (rso_id, user_id) VALUES ('${rsoId}', '${userId}')`;
    try{
        const result = await pool.query(joinRsoQuery)
        return result
    }catch(err){
        console.error(err);
        return undefined
    }
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

export async function getUniversities(){
    const [events] = await pool.query(`SELECT * FROM universities`)
    return events // returns undefined if no unis found
}


export async function getAllRSOs(){
    const [rsos] = await pool.query(`SELECT * FROM RSOs`)
    return rsos;
}

export async function getEventComments(event_id){
    const [rsos] = await pool.query(`SELECT * FROM event_comments WHERE event_id = ?`, event_id)
    return rsos;
}

export async function getEventsByRSO(user_id){
    const [rsosRows] = await pool.query(
        `SELECT rso_id FROM rso_memberships WHERE user_id = ?`,
        [user_id]
      );
    
      // Extract the RSO IDs from the query result
      const rsoIds = rsosRows.map((row) => row.rso_id);
    
      // Query the database to find all events associated with the RSOs
      const [eventsRows] = await pool.execute(
        `SELECT * FROM events WHERE is_approved = true AND rso_id IN (?)`,
        [rsoIds]
      );
}

export async function getSingleEvent(event_id){
    const [event] = await pool.query(`SELECT * FROM events WHERE event_id = ?`,event_id)
    return event[0];
}
export async function checkAdmin(user_id){
    const user = await pool.query(`SELECT * FROM users WHERE user_id = ? AND (user_level = 'admin' OR user_level = 'super_admin') `, user_id)
    return user[0];
}

export async function createUniEvent(event_name,  category, description, time, date, location_name, contact_phone, contact_email, is_public,host_university){
    const result = await pool.query(`
    INSERT INTO events( name, category, description, date, time, location_name, contact_phone, contact_email, is_public, is_approved, host_university)
    VALUES (? , ? , ? , ? ,?, ?, ? , ? , ? , ? , ?)` , [event_name, category, description, date, time, location_name, contact_phone, contact_email, is_public, 1 , host_university])
    return result
}

export async function createRSOEvent(event_name,  category, description, time, date, location_name, contact_phone, contact_email, rso_id, is_approved){
    const result = await pool.query(`
    INSERT INTO events( name, category, description, date, time, location_name, contact_phone, contact_email, is_public, is_approved, rso_id)
    VALUES (? , ? , ? , ? ,?, ?, ? , ? , ? , ?, ?)` , [event_name, category, description, date, time, location_name, contact_phone, contact_email, 0, is_approved , rso_id])
    return result
}
export async function createPublicevent(event_name,  category, description, time, date, location_name, contact_phone, contact_email){
    const result = await pool.query(`
    INSERT INTO events( name, category, description, date, time, location_name, contact_phone, contact_email, is_public)
    VALUES (? , ? , ? , ? ,?, ?, ? , ? , ? )` , [event_name, category, description, date, time, location_name, contact_phone, contact_email, 1])
    return result
}