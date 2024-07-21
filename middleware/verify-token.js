const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    console.log(token);

    if (token) {
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    message: 'Failed to authenticate token',
                });
            } else {
                req.decode = decoded;
                console.log(decoded);
                next();
            }
        });
    } else {
        return res.status(403).json({
            status: false,
            message: 'No token provided',
        });
    }
};
