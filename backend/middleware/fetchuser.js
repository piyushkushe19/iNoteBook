const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Piyushisagoodb$y'; // Preferably use process.env.JWT_SECRET

const fetchuser = (req, res, next) => {
    // Get the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET); // Or process.env.JWT_SECRET
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;
