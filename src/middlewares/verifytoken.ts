import * as jwt from "jsonwebtoken";

module.exports = (req, res, next)=>{
    const token = req.header('auth-token');
    console.log(token, 'token');
    if(!token) return res.status(500).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.log('error de verification');
        res.status(400).send("Invalid token");
    }

}
