const jwt = require('jsonwebtoken')


const tokenSign = async (user) => { //TODO: Genera Token
   
    return jwt.sign(
        //Parametro(1)-> Payload (datos) ! Carga útil:
        {
            id: user.id,
            email: user.email 
            //role: user.role
        },
        //Parametro(2)-> Secret key/token :
        process.env.JWT_SECRET, 
        //Parametro(3)-> Options/configs or Callback function (optional, will run in async mode if you provide this):
        {
            expiresIn: "2h", //TODO tiempo de vida
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { //TODO: Verifica que el token sea valido y correcto
    return jwt.decode(token, null)
}

const createTokenVerifyEmail = async (user) => { //TODO: Genera Token
   
    return jwt.sign(
        //Parametro(1)-> Payload (datos) ! Carga útil:
        {
            id: user.id,
            email: user.email 
            //role: user.role
        },
        //Parametro(2)-> Secret key/token :
        process.env.JWT_SECRET_VERIFYEMAIL, 
        //Parametro(3)-> Options/configs or Callback function (optional, will run in async mode if you provide this):
        {
            expiresIn: "2h", //TODO tiempo de vida
        }
    );
}

const verifyTokenConfirmEmail = async (token)=>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET_VERIFYEMAIL)
    } catch (e) {
        return null
    }
}



module.exports = { tokenSign, decodeSign, verifyToken, createTokenVerifyEmail, verifyTokenConfirmEmail }