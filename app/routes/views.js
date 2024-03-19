const express = require('express')
const router = express.Router()
const {checkAuth} = require("../middleware/auth");
const {login, home} = require("../controlles/views.js");


router.use("/", express.static("./app/views/public"));

router.get('/login', login);
router.get("/home", checkAuth, home);

module.exports = router;