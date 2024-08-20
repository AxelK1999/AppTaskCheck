require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const { dbConnect} = require('./config/mongo')
const { createRoles } = require('./config/initialSetup')

const helmet = require('helmet');

const PORT = process.env.PORT || 3000;

// Helmet ayuda a proteger las aplicaciones Express configurando encabezados de respuesta HTTP.
// Entre ellas el encabezado Content-Security-Policy mitiga una gran cantidad de ataques, como los scripts entre sitios.
app.use(helmet()); 

// (Intercambio de recursos entre orígenes)permite a los servidores especificar qué orígenes tienen permiso para acceder a los recursos 
app.use(cors({ origin: process.env.URL_DOMAIN_CLIENTE})); 

//analiza el cuerpo de las solicitudes HTTP con el formato JSON y hace que estén disponibles en el objeto req.body de la solicitud entrante
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Prefijo de ruta:
app.use('/api/1.0', require('./app/routes'));

dbConnect();
createRoles();

app.listen(PORT, () => {
    console.log('API lista por el puerto ', PORT);
})