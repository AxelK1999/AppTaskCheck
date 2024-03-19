
const checkOrigin = (req, res, next) => {
    try {

        console.log(req.headers.origin);
        const ruta = req.headers.origin;
        
        if(hayCoincidentes(ruta)){
            next();
        }else{
            res.status(409);
            res.send({ error: 'No tienes permisos' });
        }

    } catch (e) {
        res.status(409);
        res.send({ error: 'Tu por aqui no pasas!' });
        //next();
    }
}

function hayCoincidentes(rutaOrigenPeticion) {
    return rutasOrigenPeticiones.some( ruta => ruta == rutaOrigenPeticion);
}

const rutasOrigenPeticiones =[
    "http://localhost:3000",
];

module.exports = checkOrigin