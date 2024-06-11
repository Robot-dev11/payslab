const express = require('express');
const { authMiddelware } = require('../middleware')
const userController = require('../controllers/user');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /signup:
 *      post:
 *          summary: signup api to create user account
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: User created Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *              202:
 *                  description: Incorrect Inputs
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *              411:
 *                  description: Email already taken
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                          
 */

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.put('/updateUserDetailsBody', authMiddelware, userController.updateUserDetailsBody);

/**
 * @swagger
 * /bulk:
 *      get:
 *          summary: Returns all user
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: the list of all users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */
router.get('/bulk', authMiddelware, userController.bulk)


module.exports = router;