const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require('mysql2/promise');
const router = express.Router()




router.get("/users", async (req, res, next) => {
    res.send("Get Users ")
})

router.post("/users", async (req, res, next) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุให้ถูกต้อง
        password: '1234', // <== ระบุให้ถูกต้อง
        database: 'codecamp', // <== ระบุ database ให้ถูกต้อง
        port: 3306, // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)

    })
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await connection.execute(
        `INSERT INTO user2 (username ,password  ) VALUE ("${username}","${hashedPassword}")`
    )
    await connection.end()
    res.send({ id: result[0].insertId });
})

router.post('/token', async function (req, res) {
    const { username, password } = req.body; // รับ post json object
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // <== ระบุใหถูกตอง
        password: '1234', // <== ระบุใหถูกตอง
        database: 'codecamp', // <== ระบุ database ใหถูกตอง
        port: 3306, // <== ใส port ใหถูกตอง (default 3306, MAMP ใช 8889),
    });
    const result = await connection.query(
        `SELECT * FROM user2 WHERE username='${username}'`
    );
    // ปด connection
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


module.exports = router