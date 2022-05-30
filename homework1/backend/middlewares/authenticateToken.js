const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        next()
    } else {
        try {
            // remove 'Bearer' prefix to validate pure token value
            const decoded = jwt.verify(
                token.replace('Bearer', '').trim(),
                'codecamp_very_$secr3T!'
            );
            console.log(decoded);
            // query user-specific information with decoded as a JSON object
             next()
           
        } catch (e) {
            res.status(401).send('Unauthorized');
        }
    }


}
module.exports = authenticateToken
