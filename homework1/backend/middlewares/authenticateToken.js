const jwt = require('jsonwebtoken');

await function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const privateKey = 'codecamp_very_$secr3T!';
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).send('Unauthorized');
    } else {
        try {
            // remove 'Bearer' prefix to validate pure token value
            const decoded = jwt.verify(
                token.replace('Bearer', '').trim(),
                'codecamp_very_$secr3T!'
            );
            console.log(decoded);
            // query user-specific information with decoded as a JSON object
            res.send([
                { item: 'Product A selected' },
                { item: 'Product B selected' },
            ]);
        } catch (e) {
            res.status(401).send('Unauthorized');
        }
    }




}