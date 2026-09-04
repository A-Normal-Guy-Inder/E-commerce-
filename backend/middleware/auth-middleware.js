const jwt = require('jsonwebtoken');
const { COOKIE_NAME } = require('../config/auth-cookie');

/* Token from httpOnly cookie */
function verifyToken(req, res, next) {
    const token = req.cookies && req.cookies[COOKIE_NAME];
    if (!token) {
        return res.status(401).send({
            error: "Access Denied",
        });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (err) {
        return res.status(401).send({
            error: "Invalid Token",
        });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        return res.status(403).send({
            error: "Access Forbidden",
        });
    }
}

module.exports = { verifyToken, isAdmin };
