var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise')
const bcrypt = require("bcrypt")

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

router.post('/login', async (req, res, next)=> {
  
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

module.exports = router;
