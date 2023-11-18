const jwt = require('jsonwebtoken');

const verivyToken = (req, res, next) => {
    const token = req.cookies.token;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }   catch (error) {
        res.redirect('/?message=Invalid Token&status=false');
    }
};

module.exports = verivyToken;
