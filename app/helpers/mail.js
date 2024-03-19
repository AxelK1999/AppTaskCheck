const { Resend } = require("resend");
const { createTokenVerifyEmail , verifyTokenConfirmEmail} = require('./generateToken')

const resend = new Resend("re_LNDeL99L_KxZSoaDdBtE26T7sZRHjqFmK");//TODO: clave en variable de entorno

async function sendEmailVerifyAccount(user){
    console.log(user);
  const token = await createTokenVerifyEmail(user);
  let html = emailVerificationNotifyComponent(token);
  console.log(user.id);
  const { data, error } = await resend.emails.send({
    from: "TaskChekApp@resend.dev",
    to: [user.email],
    subject: "TaskChekApp: Verificacion de email",
    html: html,
  });

  return { data, error };
}

function emailVerificationNotifyComponent(token){
    //TODO: ver alternativa a env para el dominio
    let url = process.env.DOMINIO + "/api/1.0/auth/validateAccount?token="+token;

    let componenteHTML = `<!DOCTYPE html>
    <html>
          <head>
              <title>Notificación de verificacion de email</title>
            
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          </head>
          <body>
              <div class="container">
                  <div class="card mt-5">
                      <div class="card-body">
                          <h4 class="card-title">Valida tu email</h4>                                                            
                          <p class="card-text">Tu cuenta a sido creada con exito, valida tu cuenta accediendo a : {  ${url}  }</p>
                          <p class="card-text">Tiene 24 hs para validar su cuenta, posteriormente, este enlace pierde efecto.</p>
                          <p class="card-text">Ante algun problema enviar un correo a axelx33@hotmail.com</p>
                          <p class="card-text">Gracias por elegirnos !!!</p>
                      </div>
                  </div>
              </div>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
          </body>
    </html>`;

    return componenteHTML;
}

async function sendEmailVerifyAccountChangePass(user){

    const token = await createTokenVerifyEmail(user);
    let html = emailChangePassComponent(token);
    console.log(user.id);
    const { data, error } = await resend.emails.send({
      from: "TaskChekApp@resend.dev",
      to: [user.email],
      subject: "TaskChekApp: Cambio de contraseña",
      html: html,
    });
  
    return { data, error };
}

function emailChangePassComponent(token){
    //TODO: ver alternativa a env para el dominio
    let url = process.env.DOMINIO + "/api/1.0/auth/sendMailChangePass?token="+token;

    let componenteHTML = `<!DOCTYPE html>
    <html>
          <head>
              <title>Notificación de verificacion de email</title>
            
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          </head>
          <body>
              <div class="container">
                  <div class="card mt-5">
                      <div class="card-body">
                          <h4 class="card-title">Cambio de contraseña</h4>                                                            
                          <p class="card-text">Para realizar el cambio de contraseña acceder a : {  ${url}  }</p>
                          <p class="card-text">Tiene 24 hs para utilizar el enlace proporcionado, posteriormente, este enlace pierde efecto.</p>
                          <p class="card-text">Ante algun problema enviar un correo a axelx33@hotmail.com</p>
                          <p class="card-text">Gracias por elegirnos !!!</p>
                      </div>
                  </div>
              </div>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
          </body>
    </html>`;

    return componenteHTML;
}

module.exports = {sendEmailVerifyAccount, sendEmailVerifyAccountChangePass}
