const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    // Read token from header
    const token = req.header('x-auth-token');

    // Check if there is no token
    if(!token) {
        return res.status(401).json({msg: 'There is no token, unauthorized'})
    }

    // Validate token
    try {
        const cypher = jwt.verify(token, process.env.SECRET);
        req.user = cypher.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Invalid token'});
    }
}