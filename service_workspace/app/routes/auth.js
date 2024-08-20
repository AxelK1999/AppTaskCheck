const express = require('express')
const router = express.Router()

const rateLimit = require('express-rate-limit');

const {readHostClient, sendMailChangePass, changePassword ,validateAccount, logout , registerUser, login} = require('../controlles/auth.js');
const { validateOwner, validateUserExistenceForCreate } = require('../validators/users.js')
const checkOrigin = require('../middleware/origin.js');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const loginLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 15 minutos => de superar 5 en 15 => esperar termine esos 15 para volver a intentar
    max: 5, // número máximo de solicitudes permitidas en el intervalo de tiempo
    message: "Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.",
    /*skip: (req, res) => {
        req.errorRatelimit = true;
    }*/
});


//MONGO DB :

router.post('/loginM',loginLimiter, checkOrigin, login);
router.post('/registerM', validateOwner, registerUser);
router.get('/validateAccount', validateAccount);

router.put('/sendMailChangePass', sendMailChangePass);
router.put('/changePassword', changePassword);

router.get('/logout', logout);

router.get('/hostClient', readHostClient);


/*//Archive JSON DB:
router.post('/registerJ', validateOwner, validateUserExistenceForCreate, registerJSON);
router.post('/loginJ', loginJSON);*/


module.exports = router