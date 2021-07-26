import * as jwt from "jsonwebtoken";

module.exports = (req, res, next)=>{
    const token = req.header('auth-token');

    if(!token) return res.status(201).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch (error) {
        res.status(400).send("Invalid token");
    }

}
