var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise')
const bcrypt = require("bcrypt")
const authenticateToken = require("../middlewares/authenticateToken")
const jwt = require("jsonwebtoken")

router.get('/', function(req, res, next) {
    res.send('hello from /api')
  });
  
/* GET home page. */
router.post('/register', async (req, res, next)=> {
  
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุให้ถูกต้อง
        password: '1234', // <== ระบุให้ถูกต้อง
        database: 'day22', // <== ระบุ database ให้ถูกต้อง
        port: 3306, // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)

    })
    const { username, password , firstname, lastname,email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await connection.execute(
        `INSERT INTO user (username ,password , firstname ,lastname, email  ) VALUE ("${username}","${hashedPassword}","${firstname}","${lastname}","${email}")`
    )
    await connection.end()
    res.send({ id: result[0].insertId });
});

router.post('/login',async (req, res)=> {
    const { username, password } = req.body; // รับ post json object
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุใหถูกตอง
        password: '1234', // <== ระบุใหถูกตอง
        database: 'day22', // <== ระบุ database ใหถูกตอง
        port: 3306, // <== ใส port ใหถูกตอง (default 3306, MAMP ใช 8889),
    });
    const result = await connection.query(
        `SELECT * FROM user WHERE username='${username}'`
    );
    await connection.end();
    // พบ record
    if (result[0].length > 0) {
        const passwordMatch = await bcrypt.compare(password, result[0][0].password);
        if (passwordMatch) {
            // JWT implementation here
            const privateKey = 'codecamp_very_$secr3T!';
            const token = jwt.sign(
                {
                    id: result[0][0].id,
                    username: result[0][0].username,
                },
                privateKey,
                { expiresIn: '24h' }
            );
            res.json({ token: token });
        } else {
            res.status(401).send({ error: 'invalid credential' });
            return;
        }
    } else {
        res.status(401).send({ error: 'user not found' });
        return;
    }
});
router.get("/profile",authenticateToken,(req,res)=>{
    
    res.send([
        { item: 'Product A selected' },
        { item: 'Product B selected' },
    ]);

})



module.exports = router;
