const express = require('express');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddelware } = require('../middleware');
const accountRouter = express.Router();
const mongoose = require('mongoose')
const accountController = require('../controllers/balance')


accountRouter.use(express.json());
accountRouter.use(express.urlencoded({ extended: true}))


accountRouter.get('/balance', authMiddelware, accountController.getBalance)

accountRouter.post("/transfer", authMiddelware, accountController.transfer, accountController.getBalance);

module.exports = accountRouter