const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET} = require('./config');

const app = express();


const authMiddelware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(411).json({
            message: 'token is invalid'
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId;
        next();
    } catch(err){
        return res.status(403).json({})
    }
}

module.exports = {
    authMiddelware
}