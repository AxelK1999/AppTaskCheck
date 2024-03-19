const express = require('express')
const router = express.Router()

const {readAllWorkSpace, changeNameWorkSpace, deleteWorkSpace,addWorkSpace, saveWorkSpace, readWorkSpace} = require("../controlles/workspace.js");
const {checkAuth} = require("../middleware/auth.js");
const checkRoleAuth = require('../middleware/roleAuth')
const { validateCard, validateWorkSpace } = require('../validators/workspace.js')

//RUTAS MONGO DB:

router.get("/alls", checkAuth, checkRoleAuth(["user"]), readAllWorkSpace);
router.get("/", checkAuth, checkRoleAuth(["user"]), readWorkSpace);
router.post("/", checkAuth, checkRoleAuth(["user"]), validateWorkSpace, addWorkSpace);
router.put("/", checkAuth, checkRoleAuth(["user"]), validateWorkSpace, saveWorkSpace);
router.delete("/", checkAuth, checkRoleAuth(["user"]), deleteWorkSpace);
router.patch("/", checkAuth, checkRoleAuth(["user"]), changeNameWorkSpace);








/*//RUTAS Archivo JSON:
const {updateCard, addCard, deletCard, exchangePositionCard, changeSectionCard, addSection, deleteSection, getNotesOwner} = require("../controlles/workspace.js");

router.get("/",checkAuth, getNotesOwner);

router.put("/card",checkAuth,validateCard, updateCard);
router.post("/card",checkAuth,validateCard, addCard);
router.delete("/card",checkAuth, deletCard);

router.post("/exchangePositionCard",checkAuth, exchangePositionCard);
router.post("/changeSectionCard",checkAuth, changeSectionCard);

router.get("/createSection",checkAuth, addSection); //TODO: debe ser una post /section
router.delete("/section",checkAuth, deleteSection);*/

module.exports = router