# Proyecto: AppTaskCheck

**Descripcion :**
Aplicacion web para administrar y seguir el cumplimiento de tareas y activideades a ser realizadas para el alcance de una meta u objetivo pendiente. AppTaskCheck consiste en la creacion de espacios de tabajo compuesta por secciones (para las metas y objetivos) con tarjetas de actividades que contienen listas de tareas creadas por el usuario para el cumplimiento de la actividad. Permite al usuario crear estas tarjetas con una descripcion de la actividad y a su vez asociarla con tares para el cumplimiento de la misma, asi como el desplazamiento de las trajetas entre secciones para reflejar el estado de las tarejtas en su ciclo de vida si se desease.  

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
- Instalar Node.js (Version utilizada 20.11.1 LTS): https://nodejs.org
- Posicionarse en la carpeta donde instalara el proyecto en la terminal: 
    -  Clonar proyecto del repositiorio : `git clone https://github.com/AxelK1999/AppTaskCheck.git`
- Crear archivo `.env` en la carpeta raiz del proyecto y definir(pegar) las siguientes variables de entorno:
    ~~~
   URL_DOMAIN_SERVER="localhost:3000"
   URL_DOMAIN_CLIENTE="http://localhost:3001"
   PORT=3000
   DB_URI="mongodb://localhost/taskchek"
   JWT_SECRET="keySecret"
   JWT_SECRET_VERIFYEMAIL = "keyVerifyEmail"
    ~~~ 
- Estando posicionado en la carpeta raiz del proyecto previamente clonado, en la terminal:
    1. Insatalacion de dependencias: `npm install` o ` npm i -D `
    2. Correr servidor express en modo desarrollo: `npm run dev` o modo produccion `npm start`
    3. Posicionarse en la carpeta cliente e instalar dependencias react: `cd cliente` -> `npm install` 
    4. Correr el servidor cliente en modo desarrollo: `npm run dev` o modo produccion `npm start`

## Uso 
Acceder en el navegador a : 
~~~
http://localhost:3000/api/1.0/views/login
~~~ 

## UI (pendiente) : 

![Alt text](/esquema%20y%20diseño/image.png)
