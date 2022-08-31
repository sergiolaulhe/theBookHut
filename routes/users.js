// *************** Require's ****************//
const express = require('express');
const router = express.Router();

// *************** Controller Requirer ****************//

const usersController = require('../controllers/usersController');
const logDBMiddleware = require('../middlewares/logDBMiddleware');
const { body } = require('express-validator');
const fieldsValidationsMiddleware = require('../middlewares/fieldsValidationsMiddleware');

// ***** Validations ***** //

const validateRegisterForm = [
    body('name').notEmpty().withMessage('Debes completar este campo'),
    body('email').notEmpty().withMessage('Debes completar este campo').bail().isEmail().withMessage('Debes ingresar un email en formato valido'),
    body('mailConfirmation').notEmpty().withMessage('Debes completar este campo').isEmail().withMessage('Debes ingresar un email en formato valido'),
    body('password').notEmpty().withMessage('Debes completar este campo'),
    body('userName').notEmpty().withMessage('Debes completar este campo'),
]

//***** GET Register *****//

router.get('/register', usersController.register);
router.post('/register', logDBMiddleware, validateRegisterForm, usersController.create);

//***** GET Login *****//

router.get('/login', usersController.login);
router.post('/login', logDBMiddleware, usersController.processedLogin);

//***** User Profile *****//




module.exports = router;