const httpError = (res, err) => {
    res.status(500);
    res.send({ error: 'Se a producido un error en el servidor'});
}

function httpErrorEsp(res, err){

    res.setHeader('Content-Type', 'application/json');
    res.status(err.code).json({ result:false, error: err.message, code:err.code});

    return;
}

module.exports = { httpError, httpErrorEsp }