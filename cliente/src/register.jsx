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














/*
NOTAS:
    Las propiedades a ser pasadas a un componente deben esta encapsuladas
    en un objeto {}, dado que es JS(jsx->js) y hacepta solo un paramtro.

    Las props que no son pasadas y se intentan de ser accedidas => undefind

    Las props deberian ser inputables, ejemplo de caso mutable:
        function Input({label, typeInput, mjValid}){
            label = label+"algo";//--> Mal, en todo caso crear otra variable
        }
    //Esto evita insertidumbre de lo que se renderizara como pasar datos en la prop que no se utilizaran

    Funciones como props ():
        function Element({label}){
            
            const format = (label) =>"@"+{label};

            return <label class="form-label">{format}</label>
        }

    La prop especial "children" es un array de los elemtos hijos HTML o TXT:
        function Card({children}){
            console.log(children);
            return <a>My Card</a>;
        }
        
        => <Card> Hola </Card> //--> "Hola"

    Pasar todas las props y no de a una: 
        const props = {prop1, prop2, prop3}
        <Card {...props}> Hola </Card> 
        
        
    useState(valor/obejto) : [variable, funcUpdateVaraible]
    //Permite al cambiar el estado de una propiedad(variable usada en elemento) con funcUpdateVaraible
    //e automaticamente impactar los cambios unicamente en esa propiedad en el elemento renderizando unicamente elemento
    //en el arbol del dom y no todos(raclculando) {ver en inpector lo que parpadea para verificarlo} => 
    //lo hace declarativo y no imperativo (obtener componentes que utilizan esa propiedad, cambiar de valor, volver a renderizar).  
    //NOTA (para consistencia): si cambia el estado de propiedades de elemento padre => propaga renderizado a hijos
    asi como al cambiar el estado de elemnto hijo hermano => propaga a los hermanos el renderizado (aunque no aya cambios en esos hermanos).
    {Hay formas para que no se rendericen esos elementos para mayor optimizacion -> VER}

    //Para parametros(valor) de inicializacion => initialNameVariable => useState(initialNameVariable).
    //los paramteros de inicializacion solo se ejecutan una vez(al usar el useState) y no se propagan del
    entre elementos al producirse cambios y pasando el valor => no se reinicializan:

        function ElementoA({initialNamVariableA}){
            const {variableA, functUpdateA} = useState(initialNamVariableA);
            cont text = variableA ? "verdadero" : "falso";

            funtion handleClick(){
                functUpdateA(!variableA);
            }

            return (
                <a>{text}</a>
                <button onClick(handleClick)></button>
            );
        }


        //Ejemplo de error comun: pensar que al cambiar el estado de variableA de padre se propagara al ElementoA
        //es decir que se actualizara "initialNamVariableA = {variableA}" al activarse el evento del boton del padre
        //esto dado que el estado solo se inicializa una vez y los estados y constantes dentro de los componentes son 
        //independientes. (si funcionara el del boton propio del elemento hijo) => 
        //useState: alcance unacamente dentro de componente

        function app(){
            const {variableA, functUpdateA} = useState(false);
            return(
                <ElementoA initialNamVariableA = {variableA}> </ElementoA>
                <button onClick(()=>{ functUpdateA(!variableA) })></button>
            );

            
        }
        
        ==> Cuando mas de un componente puede o debe alterar un mismo estado (ejemplo guardado de espacio de trabajo)
        => patron single page (estado global) utilizando para las acciones customHooks / useContext.

        Ejemplo de CutomHooks: useNameHooks debe tener al inicio del nombre "use":
  
            function useCounter(initialValue = 0, step = 1) {
                const [count, setCount] = useState(initialValue);

                const increment = () => {
                    setCount(count + step);
                };
                const decrement = () => {
                    setCount(count - step);
                };
                const reset = () => {
                    setCount(initialValue);
                };
                return { count, increment, decrement, reset };
            }
        Ejemplo de Uso (igual uso que useState): 
            {variableCount, increment, decrement, reset} = useCounter(0, 1);

      useEffect(function, [intervalTime/variableEstado])
      //useEffect se ejecuta por cada frame o cierto intervalo de tiempo o al cambiar el estado de alguna variable especifica.
      //Utilizada para ejecutar cienrtas funciones durante el ciclo de vida de la aplicacion

      useContext(funct/variable): permite que cualquier componente tenga acceso a esa variable/funcion
      Ejemplo:
            Dentro de componente A o de fomra gloabl:
                const Thema = {a,b,c};
                useContext(Thema);
            
            Componente C que no tiene alcance a la variable:
            let thema = useContext(Thema);// ahora la tiene
    //---------------------------------------------------------
    Como hacer que el padre sea conciente de propiedades o valor de variable de un elemento que fomra parte del componente:
        function Input({label, typeInput, mjValid, value, onChange}){
            return (
                <div className="mb-3">
                    <label className="form-label">{label}</label>
                    <input type={typeInput} className="form-control" value={value} onChange={onChange}required></input>
                    <div className="valid-feedback"> {mjValid} </div>
                </div>
            );
        }
        ==>
        export default function Register(){
            const [inputName, setInputName] = useState("");
            
            const propsInputNameUser = {
                label:"Ingrse su nombre de ususario: ",
                typeInput: "text",
                mjValid:"Ingrese un nombre de ususario",
                value: inputName,
                onChange:(event) => setInputName(event.target.value),
            }
            
            return (
                <form className="mx-auto mt-5 ">         
                    <Input {... propsInputNameUser}></Input>
                    <button type="submit" className="btn btn-outline-primary mt-2 text-light"
                    onClick={()=>{console.log(inputName)}}>
                        Confirmar
                    </button>   
                </form>
            );

        }
        
    
*/
