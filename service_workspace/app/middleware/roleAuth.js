
const { verifyToken } = require('../helpers/generateToken');
const user = require('../models/UserMongo');
const {ROLES, Role} = require('../models/Role');

//Parametro roles : Array ["nameRole"]
const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.cookies.session; 
        const tokenData = await verifyToken(token);
        const Account = await user.findById(tokenData.id);

        let rolesName = [];
        for(const rolID of Account.owner.roles){

            const Rol = await Role.findById(rolID);
            rolesName.push(Rol.name);
        }

        if (hayCoincidentes(roles, rolesName)) { 
            next();
        }else {
            res.status(409)
            res.send({ error: 'No tienes permisos' })
        }
       
    } catch (e) {
        console.log(e);
        res.status(409);
        res.send({ error: 'A ocurrido un problema !' });
    }
}

function hayCoincidentes(array1, array2) {
    //[].concat(roles).includes(Rol.name)
    return array1.some(elemento => array2.includes(elemento));
}

module.exports = checkRoleAuth