const express = require('express')
const router = express.Router()
//const checkOrigin = require('../middleware/origin')
const {checkAuth} = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const {readOwnerByEmail, updateOwnerByEmail, updateNameOwnerByEmail } = require("../controlles/users.js");
const { validateName, validateOwner,  validateAuthPassword } = require('../validators/users')

//RUTAS MONGO DB:
    router.get('/M', checkAuth, checkRoleAuth(["user"]), readOwnerByEmail);
    router.put('/M', checkAuth, checkRoleAuth(["user"]), validateOwner, updateOwnerByEmail);
    router.patch('/M',checkAuth, validateName, updateNameOwnerByEmail);
    //router.delete(checkAuth,);



/* //RUTAS Archivo JSON:
const { readOwnerByEmailJSON, updateOwnerByEmailJSON } = require("../controlles/users.js");

    router.get('/J', checkAuth, checkRoleAuth(['admin']),readOwnerByEmailJSON);
    router.put('/J', checkOrigin, checkAuth, validateOwner, validateAuthPassword, updateOwnerByEmailJSON);
*/

module.exports = router