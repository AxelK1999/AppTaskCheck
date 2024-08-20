import { useState } from "react";
import { sendRegister, DOMAIN_SERVER } from "./requests";

function Input({label, typeInput, mjValid, name}){
    return (
    <div className="mb-3">
        <label className="form-label">{label}</label>
        <input type={typeInput} className="form-control" name={name} required></input>
        <div className="valid-feedback"> {mjValid} </div>
    </div>
    );
}

function FormRegisterAccount(){
    
    const propsInputNameUser = {
        label:"Ingrse su nombre de ususario: ",
        typeInput: "text",
        mjValid:"Ingrese un nombre de ususario",
        name:"inputName"
    }
    const propsInputEmail = {
        label:"Ingrse su email: ",
        typeInput:"email",
        mjValid:"Ingrese un email valido",
        name:"inputEmail"
    }
    const propsInputPassword = {
        label:"Ingrse su contraseña: ",
        typeInput:"password",
        mjValid:"Ingrese una contraseña",
        name:"inputPassword"
    }

    let [mensaje, setMensaje] = useState("");
    let [state, setState] = useState(false);

    let stateAlert = state ? "" : "visually-hidden ";
    stateAlert += " alert alert-danger";

    const handleClickSendRegister = async(event)=>{
        const name = event.target.inputName.value;
        const email =  event.target.inputEmail.value;
        const password =  event.target.inputPassword.value;
        const data = await sendRegister({name, email, password});

        if(data && !data.result){
            setState(true);
            setMensaje(data.error);
        }else if(data.result){
            setState(true);
            setMensaje("Cuenta creada con exito !! ");
        }
    }

    return (
        <form className="mx-auto mt-5 w-auto" 
        onSubmit={(event)=>{ event.preventDefault(); handleClickSendRegister(event); }}>

            <h1 className="mb-3 mt-5">Registro de cuenta</h1>
            <div className="inputs">
                <Input {... propsInputNameUser}></Input>
                <Input {... propsInputEmail}></Input>
                <Input {... propsInputPassword}></Input>
            </div>

            <div className={stateAlert} role="alert">
                {mensaje}
            </div>

            <hr/>

            <footer className="d-flex flex-row-reverse">
                <button type="submit" className="btn btn-outline-primary mt-2 text-light">Confirmar</button>
            </footer>

        </form>
    );
}

export default function Register(){

    return (
        <section className="d-flex flex-column">
            <nav className="navbar bg-body-tertiary mb-3">
                <div className="container">
                    <a className="navbar-brand fs-3" href= {DOMAIN_SERVER + "/api/1.0/views/login"}>⇚ login</a>
                </div>
            </nav>
            <FormRegisterAccount></FormRegisterAccount>
        </section>
    );
}
