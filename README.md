# Proyecto: AppTaskCheck

**Descripción:**
Aplicación web para administrar y seguir el cumplimiento de tareas y actividades a ser realizadas para el alcance de una meta u objetivo pendiente. AppTaskCheck consiste en la creación de espacios de trabajo compuesta por secciones (para las metas y objetivos) con tarjetas de actividades que contienen listas de tareas creadas por el usuario para el cumplimiento de la actividad. Permite al usuario crear estas tarjetas con una descripción de la actividad y a su vez asociarla con tares para el cumplimiento de la misma, así como el desplazamiento de las tarjetas entre secciones para reflejar el estado de las tarjetas en su ciclo de vida, si se desease.  

![image](https://github.com/user-attachments/assets/11ce1301-b118-4e07-92eb-fc4634afa5bc)

## Características 

- Registro, actualización, login y autenticación de usuarios.
- Control de autorización y origen de peticiones
- Operaciones CRUD sobre espacio de trabajo.
- Validación y control de datos de entrada.
- Encriptación de activos críticos (password).
- Límite de intentos de login (contra fuerza bruta)
- Implementación de seguridad en encabezados de peticiones(helemt)
- Movimiento libre y detección de colisión de tarjeta.
- Validación y recepción de emails con resend
- Otros

## Tecnologías Utilizadas
- **Node y express**
- **Base de datos: MongoDB** 
- **Boostrap 5**
- **React + Vite**

## Arquitectura y patrones implementados: 
- Arquitectura: **MVC**,  **RESTFUL**
- Patrones: **Factory**, **Singleton**, **Middelware**, **Observer**, **Module**, **composite**. 


## Instalación y configuración
- Instalar MongoDB (Versión utilizada 7.0.7): https://www.mongodb.com/try/download/community
- Instalar Node.js (Versión utilizada 20.11.1 LTS): https://nodejs.org
- Posicionarse en la carpeta donde instalara el proyecto en la terminal: 
    -  Clonar proyecto del repositorio: `git clone https://github.com/AxelK1999/AppTaskCheck.git`
- Crear archivo `.env` en la carpeta `service_workspace` del proyecto y definir(pegar) las siguientes variables de entorno:
    ~~~
   URL_DOMAIN_SERVER="localhost:3000"
   URL_DOMAIN_CLIENTE="http://localhost:3001"
   PORT=3000
   DB_URI="mongodb://localhost/taskchek"
   JWT_SECRET="keySecret"
   JWT_SECRET_VERIFYEMAIL = "keyVerifyEmail"
    API_KEY_RESEND = "keyResend"
    ~~~ 
- Estando posicionado en la carpeta raíz del proyecto previamente clonado, en la terminal:
    1. Instalación de dependencias: `cd service_workspace` `npm install`
    2. Correr servidor express en modo desarrollo: `npm run dev` o modo producción `npm start`
    3. Posicionarse en la carpeta cliente_register e instalar dependencias react: `cd ..` -> `cd cliente_register` -> `npm install` 
    4. Correr el servidor cliente en modo desarrollo: `npm run dev` o modo producción `npm start`

## Uso 
Acceder en el navegador a: 
~~~
http://localhost:3000/api/1.0/views/login
~~~ 

## Diseño UI home: 

![image](https://github.com/user-attachments/assets/f1f4b361-8175-4858-b38f-eabdccfa22ce)

