# Proyecto: Api Task Check

**Descripcion :**

Consiste en una api que permite administrar notas y listas de tareas a realizar de ususarios registrados previemente, estas estan organizadas dentro de un espacio de trabajo que posee cada ususario, esta compuesta por secciones (creadas y tituladas por el usuaruio) que contienen tarjetas, cada una de ellas con notas y listas de tareas correspondientes a la vinculadas y creadas para el cumplimiento de la actividad que represente esa tarjeta en particular. 

La misma presenta una version que contiene como base de datos un archivo JSON [url + "J"] y otra como base de datos a MongoDB [url + "M"].  

## Caracterisitcas 

- Registro y auntenticacion de usuarios.
- Registro, actualizacion y consulta de notas y pendientes.
- Gestion y posicionamiento de secciones y tarjetas.
- Validacion y control de datos de entrada.
- Encriptacion de activos criticos (password).

## Tecnologias Utilizadas
- **Node y express**
- **Base de datos : MongoDB** 
- **Boostrap 5**

## Arquitectura y patron de carpetas: 
- Utilizacion de arquitecutra **MVC**
- Utilizacion de arquitectura **REST** para el manejo de las rutas
- Patron de organizacion de carpetas :
    - Validators : se almacenan funciones encargadas de validar datos de entrada antes de que se procesen o almacenen en la base de datos. 
    - Middleware : se almacenan funciones de middleware que se utilizan para procesar solicitudes HTTP antes de que lleguen a las rutas o controladores finales. 
    - Helpers : funciones auxiliares o utilidades que se utilizan en varias partes de la aplicación.
    - Config : se almacena la configuración de la aplicación (configuraciones de bases de datos, opciones de autenticación, etc.).
    - Modelo : esquemas y modelos de datos utilizados en la aplicación. 
    - Vista
    - Controlador
    - Routes : rutas especifican qué controlador y función de controlador deben ejecutarse cuando se recibe una solicitud en una URL específica. 

## Intalacion y configuracion
- Instalar Mongo DB (Version utilizada 7.0.7): https://www.mongodb.com/try/download/community
- Instalar Node.js (Version utilizada 20.11.1): https://nodejs.org
- Posicionarse en la carpeta donde instalara el proyecto: 
    -  Clonar proyecto del repositiorio : `git clone https://github.com/AxelK1999/AppTaskCheck.git`
- Crear archivo `.env` en la carpeta raiz del proyecto y definir(pegar) las siguientes variables de entorno:
  
   URL_DOMAIN_SERVER="localhost:3000"
   URL_DOMAIN_CLIENTE="http://localhost:3001"
   PORT=3000
   DB_URI="mongodb://localhost/taskchek"
   JWT_SECRET="keySecret"
   JWT_SECRET_VERIFYEMAIL = "keyVerifyEmail"
  
- Estando posicionado en la carpeta raiz del proyecto previamente clonado, en la terminal:
    1. Insatalacion de dependencias: `npm install` o ` npm i -D `
    2. Correr servidor express en modo desarrollo: `npm run dev` o modo produccion `npm start`
    3. Posicionarse en la carpeta cliente e instalar dependencias react: `cd cliente` -> `npm install` 
    4. Correr el servidor cliente en modo desarrollo: `npm run dev` o modo produccion `npm start`

## Uso 
    Acceder a http://localhost:3000/api/1.0/views/login
    
Las peticiones pueden realizarse en extensiones como Thunder o Postman, por las rutas de los controladores:

GET `http://localhost:3000/api/1.0/notes`

PUT `http://localhost:3000/api/1.0/notes/card`

POST `http://localhost:3000/api/1.0/notes/card`

DELETE `http://localhost:3000/api/1.0/notes/card`

**..........** 

Que se encuentran en : `app/routes/notes.js` y `app/routes/users.js` sin embargo se presenta la siguiente alternativa para poder probar: 

###### Base de datos JSON :

    Registro de cuenta :
        En el proyecto acceder y modificar/definir su datos de cuenta : " app/views/public/js/requestsApiTest.js " en el funcion "registerJSON()".
        Acceder a : http://localhost:3000/api/1.0/views/register para impactar el mismo .

    Login :
        Ingresar los datos de su cuenta en : http://localhost:3000/api/1.0/views/login proceso correcto al otorgarle accceso al "http://localhost:3000/api/1.0/views/home" .

    User(owner):
        Para actualizar/editar datos del usuario acceder y definirlos en " app/views/public/js/requestsApiTest.js " en la funcion "updateUser()" y acceder a http://localhost:3000/api/1.0/views/updateUser .
        Para leer los datos de usuario acceder a http://localhost:3000/api/1.0/users/J .

    Seccion(section) :
        Para crear acceder a http://localhost:3000/api/1.0/notes/createSection .
        Para borrar una seccion definir el Id(nro) de la seccion a borrar en " app/views/public/js/requestsApiTest.js " en la funcion "deleteSection()" y acceder a http://localhost:3000/api/1.0/views/deleteSection para impactar operacion.  

    Taerjeta(card) : 
        Para crear acceder y definir los datos de la tarjeta en " app/views/public/js/requestsApiTest.js " en la funcion "addCard()" y acceder a http://localhost:3000/api/1.0/views/addCard para impactar operacion.
        Para borrar definir el Id(nro) de la seccion y id de la tarjeta a borrar en " app/views/public/js/requestsApiTest.js " en la funcion "deleteCard()" y acceder a http://localhost:3000/api/1.0/views/deleteCard para impactar operacion.
        Para editar acceder y definir los datos de la tarjeta en " app/views/public/js/requestsApiTest.js " en la funcion "updateCard()" y acceder a http://localhost:3000/api/1.0/views/updateCard .
        Para visualizar las notas acceder a http://localhost:3000/api/1.0/notes . 
    
    Intercambio de posicion :
        Para intercambiar Cards definir y acceder a " app/views/public/js/requestsApiTest.js " en la funcion "changePositionCard()" y acceder a http://localhost:3000/api/1.0/views/exchangePositionCard .
        Para intercambiar Sections definir y acceder a " app/views/public/js/requestsApiTest.js " en la funcion "changeSectionCard()" y acceder a http://localhost:3000/api/1.0/views/changeSectionCard para impactar operacion.

###### Base de datos Mongo DB :

    Registro de cuenta :
        En el proyecto acceder y modificar/definir su datos de cuenta : " app/views/public/js/requestsApiTest.js " en la funcion "registerMongo()" .
        Acceder a : http://localhost:3000/api/1.0/views/registerM para impactar el mismo .

    Login :
        Ingresar los datos de su cuenta en : " app/views/public/js/requestsApiTest.js " en la funcion "loginMongo()"  y acceder a "http://localhost:3000/api/1.0/views/loginM" se informara en consola resultado de operacion, de ser correcta podra nabegar al home: "http://localhost:3000/api/1.0/views/home".

    User(owner):
        Para actualizar/editar datos del usuario acceder y definirlos en " app/views/public/js/requestsApiTest.js " en la funcion "updateUserMongo()" y acceder a http://localhost:3000/api/1.0/views/updateUserM para impactar operacion.
        Para leer los datos de usuario acceder a http://localhost:3000/api/1.0/users/M .
-------
## UI (pendiente) : 

![Alt text](/esquema%20y%20diseño/image.png)
