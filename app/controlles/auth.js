const { httpError, httpErrorEsp } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign, verifyTokenConfirmEmail} = require('../helpers/generateToken')
const { sendEmailVerifyAccount, sendEmailVerifyAccountChangePass } = require('../helpers/mail')

const UserMongo = require('../models/UserMongo.js');
const {Role, ROLES} = require('../models/Role.js');

const login = async (req, res) => {
    try {
        /*
        if(req.errorRatelimit){ 
            console.log(req.errorRatelimit);
            return;
        }*/

        const { email, password } = req.body
        const user = await UserMongo.findOne({"owner.email" : email}, "owner");        
        
        if (!user || !password) {
            const error = new Error();
            error.code = 404;
            error.message = 'User not found';
            throw error;
        }
        
        let userLogin = { id: user._id , email : user.owner.email} 
      
        const checkPassword = await compare(password, user.owner.password);// verifica si contraseña concide con la encriptada 

        // JWT
        const tokenSession = await tokenSign(userLogin);

        if (checkPassword) {
            //Cliente guarda la cookie automaticamnte --> enviada en posteriores solicitudes automaticamnete mientras la cookie este viva (req.cookies.nameCookie)
            const cookie = res.cookie("session",tokenSession, {
                httpOnly: true,//indica si la cookie puede ser utilizada sólo por métodos http/s => no por extensiones o por codigo en el navegador por el cliente
                secure: false/*process.env.NODE_ENV === "production"*/,//indicar si se quiere que una cookie sólo pueda ser utilizada en conexiones HTTPS (true).
                sameSite: "strict", //Restringir desde que dominio(pagina) se puede acceder a la cookies (stric: solo desde mismo dominio (ayuda a evitar ataques CSRF cuando la cookie contiene credenciales como este caso) - lax: cualquier dominio ) 
                maxAge: 1000 * 60 * 60,//Tiempo de vida en seg
            });

            res.setHeader('Content-Type', 'application/json');
            res.status(201).json({"result" : true, "session": tokenSession});
            //res.redirect("/api/1.0/views/home");
          
            return;
        }

        if (!checkPassword) {  
            const error = new Error();
            error.code = 409;
            error.message = 'Invalid password';
            throw error;  
        }

    } catch (e) {
        httpErrorEsp(res, e);
    }
}

const registerUser = async (req, res) => {
    try {
        const {email, password, name} = req.body
        const passwordHash = await encrypt(password)
        
        //$in: operador que selecciona los documentos donde el valor del campo especificado es igual a alguno de los valores en el array proporcionado.
        const roles = await Role.find({ name: { $in: ["user"] } });
        
        const owner = {
           email,
           password : passwordHash,
           name,
           roles: roles.map((role) => role._id),
           validated:true //TODO: en false al tener activo el envio de emails de validacion
        }
        const Account = { owner, WorkSpaces : [ 
                    {
                        "name": "WorkSpace",
                        "sections":[]
                    }
                ]
            }
        let existsUser = await UserMongo.exists({"owner.email" : owner.email});
        res.setHeader('Content-Type', 'application/json');
        if(!existsUser){

            let user = new UserMongo(Account);

           /* const { data, error } = await sendEmailVerifyAccount({"id": user.id, "email" : user.owner.email});
            if(error){
                return res.status(400).json({"result" : false, error });
            }*/

            await user.save();
            res.status(201).json({"result" : true, "inf" : "Usuario registrado correctamente"});       
            
        }else{
            res.status(400).json({"result" : false, "error": "Usuario ya registrado con este email"});
        }
      
    } catch (e) {
        httpError(res, e)
    }
}

function logout(req, res) {
    res.cookie('session', '', { expires: new Date(-150) });
    res.redirect("/api/1.0/views/login");
    console.log("Cerrando sesion");
    return;
}

async function validateAccount(req, res){
    
    try{
        const token = req.query.token;
        const tokenData = await verifyTokenConfirmEmail(token);
       
        const saveWorkSpace = await UserMongo.updateOne(
            { 'owner.email': tokenData.email },
            { $set: { 'owner.validated': true} } 
        );

        res.redirect("/api/1.0/views/login");

    }catch (e) {
        httpError(res, e)
    }

}


async function sendMailChangePass(req, res){
    try{

        let email = req.query.email
        const { data, error } = 
        await sendEmailVerifyAccountChangePass({"id": 11, "email" : email});

        if(error){
           return res.status(400).json({"result" : false, "error": error});
        }else{
           return res.status(200).json({"result" : true, "inf": data});
        }
    
    }catch (e) {
        httpError(res, e)
    }
}
async function changePassword(req, res){
    try{

        //TODO: controlador ejecutado recibiendo new password estando verificado perviemente el email.
        const {newPass, email} = req.body;
        
        const updatedOwner = await UserMongo.findOneAndUpdate(
            { 'owner.email': email},
            { $set: { "owner.password" : newPass } } );
  
        res.status(200).json({"result": true, "inf":"Contraseña cambiada con exito"});
  
    } catch (e) {
      console.error('Error al actualizar el Owner:', e);
      httpError(res, e);
    }
}
async function readHostClient(req, res){
    try{

        const url = process.env.URL_DOMAIN_CLIENTE;
        console.log(url);
        res.status(200).json({"result": true, "domain": url});
  
    } catch (e) {
      httpError(res, e);
    }
}

module.exports = {
                readHostClient,
                changePassword,
                sendMailChangePass,
                validateAccount,
                registerUser,
                login,
                logout
}



//-------------------------------------------------------------------
//---------------------- JSON ------------------------------
//const UserJSON = require("../models/UserJson.js");
/*
  const loginJSON = async (req, res) => {
    try {
        
        const { email, password } = req.body
       
        const user = await UserJSON.findUser(email);

        if (!user || !password) {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = await compare(password, user.password);// verifica si contraseña concide con la encriptada 
     
        // JWT
        const tokenSession = await tokenSign(user); 

        if (checkPassword) {
           
            //Cliente guarda la cookie automaticamnte --> enviada en posteriores solicitudes automaticamnete mientras la cookie este viva (req.cookies.nameCookie)
            res.cookie("session",tokenSession, {
                httpOnly: true,//indica si la cookie puede ser utilizada sólo por métodos http/s => no por extensiones o por codigo en el navegador por el cliente
                secure: false/*process.env.NODE_ENV === "production",//indicar si se quiere que una cookie sólo pueda ser utilizada en conexiones HTTPS (true).
                sameSite: "strict", //Restringir desde que dominio(pagina) se puede acceder a la cookies (stric: solo desde mismo dominio (ayuda a evitar ataques CSRF cuando la cookie contiene credenciales como este caso) - lax: cualquier dominio ) 
                maxAge: 1000 * 60 * 60,//Tiempo de vida en seg
            });

            console.log("Login realizado correctamente");
            res.status(200);
            res.redirect("/api/1.0/views/home");
          
            return;
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            });

            return;
        }

    } catch (e) {
        httpError(res, e)
    }
}

const registerJSON = async (req, res) => {
    try {

        const {email, password, name} = req.body

        const passwordHash = await encrypt(password) 

        let data = UserJSON.readData();
        const largID = findLargestIdOwner(data);

        const owner = {
           id : largID + 1, 
           email,
           password : passwordHash,
           name 
        }

        const Account = { owner, WorkSpaces : [ 
                    {
                        "name": "WorkSpace",
                        "sections":[]
                    }
                ]
            }

        data.push(Account);
        let status;
        
        let result = UserJSON.writeData(data);
        //TODO : Email de confirmacion => auntentica email
        
        if(result){ status = 200 } else { status = 500; }

        res.setHeader('Content-Type', 'application/json');
        res.status(status).json({"result" : result});

    } catch (e) {
       httpError(res, e)
    }
}

function findLargestIdOwner(objectsArray) {

   let largestId = -1;
   
   for (let obj of objectsArray) {
    console.log("----->",obj.owner);
       if (obj.owner.id > largestId) {
           largestId = obj.owner.id;
       }
    }
    return largestId;
}*/
//module.exports = {registerJSON, loginJSON}

//----------------------------------------------------------
//Nativa en navegador y node.js:
//const crypto = require('crypto'); 
//Cifrado de datos sensibles a ser almacenados en base de datos
const cifradoSimetrico = ()=>{
    let data = [{id: 1}, {id: 2}]

    // Encrypt
    let ciphertext = crypto.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

    // Decrypt
    let bytes  = crypto.AES.decrypt(ciphertext, 'secret key 123');
    let decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    console.log(decryptedData); // [{id: 1}, {id: 2}]
}




