const { httpError } = require('../helpers/handleError');

const pathBase = __dirname.replace(/\\/g, '/').replace("/app/controlles","");

const login = (req, res) => {
    try{
      /*let pathLogin = __dirname.replace(/\\/g, '/');
        pathLogin = pathLogin.replace("/app/controlles","/app/views/login.html"); */
        //console.log("Errores : ",req.query.err);
        res.sendFile(pathBase + "/app/views/login.html");
    } catch (e) {
        httpError(res, e);
    }
}

const home = (req, res) =>{
    try{ 

        res.sendFile(pathBase + "/app/views/home.html");
        //res.send({cook: req.cookies.session, hi:"hola"});

    } catch (e) {
        httpError(res, e);
    }
}



module.exports = {login, home}