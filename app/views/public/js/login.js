
function setInvalidInput(componente){
    componente.classList.add("is-invalid");
    componente.classList.remove("is-valid");
}

function setValidInput(componente){
    componente.classList.add("is-valid");
    componente.classList.remove("is-invalid");
}

async function login(pass, email){
    let response;
    try {
        const body = {"password" : pass, "email" : email};
        response = await fetch('../auth/loginM', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        
        const responseData = await response.json();
        //if(!response.ok){alert("Se a producido un erro al intentar logearlo. \n"+ responseData.error);}
        return responseData;

      } catch (error) {
        alert("A sobrepasado en numero de peticiones por intervalo de tiempo, debera esperar 10 min para volver a intentar.");
        return null;
      }
}

function setCookie(nombre, valor, opciones) {
    opciones = opciones || {};

    var cookieString = nombre + "=" + encodeURIComponent(valor);

    if (opciones.expires) {
        cookieString += ";expires=" + opciones.expires.toUTCString();
    }

    if (opciones.maxAge) {
        cookieString += ";max-age=" + opciones.maxAge;
    }

    if (opciones.domain) {
        cookieString += ";domain=" + opciones.domain;
    }

    if (opciones.path) {
        cookieString += ";path=" + opciones.path;
    }

    if (opciones.secure) {
        cookieString += ";secure";
    }

    if (opciones.httpOnly) {
        cookieString += ";httponly";
    }

    if (opciones.sameSite) {
        cookieString += ";samesite=" + opciones.sameSite;
    }

    document.cookie = cookieString;
}

//-Eventos:
document.querySelector(".btnStarSesion").addEventListener("click", async(event)=>{
    const inputPassword = document.querySelector(".inputPassword")
    const inputEmail = document.querySelector(".inputEmail");
    
    const resultValidationEmail = inputEmail.checkValidity()
    const resultValidationPassword = inputPassword.checkValidity();

    if(!resultValidationEmail){
        setInvalidInput(inputEmail);
    }else{
        setValidInput(inputEmail);
    }

    if(!resultValidationPassword){
        setInvalidInput(inputPassword);
    }else{
        setValidInput(inputPassword);
    }

    if(resultValidationEmail && resultValidationPassword){
        const password = inputPassword.value;
        const email = inputEmail.value;
    
        let response =  await login(password, email);

        if(response && response.result){
            setCookie("session", response.session, {
                httpOnly: true,
                secure: false, // Ajusta esto según sea necesario
                sameSite: "Strict", // Ajusta esto según sea necesario
                maxAge: 1000 * 60 * 60 // Tiempo de vida en segundos
            });
            window.location.href = "../views/home";
        }

        if(response && !response.result){
            if(response.code == 409){
                setInvalidInput(inputPassword);
            }else{
                setInvalidInput(inputEmail);
                setInvalidInput(inputPassword);
            }
        }
    }
});

document.querySelector(".btnCrearCuenta").addEventListener("click", async()=>{

    const host = await readHostClient();
    const DOMAIN_CLIENT = host.result ? host.domain : window.location.href;

    window.location.href = DOMAIN_CLIENT+"/?page=register&dominioServer=" + window.location.host;
});

async function readHostClient(body){
    try {
        let url = "../auth/hostClient";
        const response = await fetch(url, { method: 'GET' });
        const responseData = await response.json();
        if(!responseData.result){
            alert("Error al obtener host de servidor cliente");
        }
        return responseData;

      } catch (error) {
        console.error('Error:', error);
        return null;
      }
}

//const urlParams = new URLSearchParams(window.location.search);
//const codigoError = urlParams.get('err');