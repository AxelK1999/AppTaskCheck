import {checkItem, checkList, card, handleClickAddCheckList} from './componentes/card.mjs';
import { section,containerSections} from './componentes/section.mjs';
import { navHome, navItemWorkSpace, navItemProfileUser, attachNavItemWorkSpaceEvents } from './componentes/nav.mjs'
import { modalOfCard } from './componentes/modal.mjs';

import { readAllWorkSpace, addWorkSpace, readOwner, readWorkSpace, updateWorkSpace } from './requests.mjs';

let saveStatus = "1";

const SaveStatus ={
  STATES: {"SAVE":"1","SAVING":"2", "CHANGE":"3","ERROR":"4" },
  subscribers:[],

  subscribe: function(funct){ 
    this.subscribers.push(funct); 
  },

  setState: function(STATE){ 
    saveStatus = STATE;
    this.notifyChangeState(STATE);
  },

  notifyChangeState:function(state){
    this.subscribers.forEach(func =>{
      func(state);
    });
  },

  getInstance: function(){
    return this;
  }
}


//                                 ---------- EVENTOS ----------

//Movimineto de una tarjeta de posicion de dentro de una misma seccion o hacia otra
function handleClickMoveComponent(event,componente, funcExecuteMoving, argumentosFuncExecute){
  //Posiciones iniciales del mouse
  const initialMouseX = event.pageX;
  const initialMouseY = event.pageY;

  const moveComponent = (moveEvent) => {
      //Obtener las nuevas posiciones del mouse
      const newMouseX = moveEvent.pageX;
      const newMouseY = moveEvent.pageY;

      componente.style = "position:absolute";
      componente.style.left = newMouseX + "px";
      componente.style.top = newMouseY + "px";
      //---------------------------------------

      funcExecuteMoving(componente, argumentosFuncExecute);

      //--------------------------------------
      componente.setAttribute("moving",true);
  };
  document.addEventListener("mousemove", moveComponent);
  document.addEventListener("mouseup", () => {
      //componente.setAttribute("moving",false);
      //Restablece a la posicion original
      //componente.setAttribute("style","top:0px; left:0px;");
      // Remover los listeners cuando se suelta el botón del mouse
      document.removeEventListener("mousemove", moveComponent);
  });

}
function handleDetermineCardPositionInMoving(componente, arg){

  let keySeccionOfCard = arg[0];

  let sections = document.querySelectorAll(".section");
  let currentSection = {component:null, distance:99999};
  let sectionOfComponente;

  //Busca seccion con quien colisiona
  sections.forEach(s=>{
    let result = detecteCollision(componente, s);
    if(result.collision){
        currentSection.component = s;
        currentSection.distance = result.distance;
      }else{
        s.classList.remove('shadow-lg');
      }
  });
  
  if(currentSection.component){
    currentSection.component.classList.add('shadow-lg');

    //Busca cards dentro de la seccion con la que colisiono y determinar con cual de ellas tambien lo hace
    let cards = currentSection.component.querySelectorAll(".card");
    if(cards.length == 0){

        componente.setAttribute("keyCardCollision", null);
        componente.setAttribute("posCardCollision", null);
        componente.setAttribute("keySectionCollision",currentSection.component.getAttribute("key"));
        return;
    }
    cards.forEach( C =>{
      
      let result = detecteCollision(componente, C);
    
      if(result.collision){
        if(keySeccionOfCard == currentSection.component.getAttribute("key")
          && componente.getAttribute("key") == C.getAttribute("key")){
            return;
        }

        let posicion = determineIfPosInferiorOrSuperior(C, componente);

        if(posicion == "above"){
          C.style.borderTop  = "8px solid #E2B81B";
          C.style.borderBottom = "none";

        }else if(posicion == "under"){
          C.style.borderTop = "none";
          C.style.borderBottom = "8px solid #E2B81B";
  
        }
        //key con card que colisiona y si esta por encima o debajo para insertar card en section
        componente.setAttribute("keyCardCollision", C.getAttribute("key"));
        componente.setAttribute("posCardCollision", posicion);
        componente.setAttribute("keySectionCollision",currentSection.component.getAttribute("key"));

      }else{
        C.style.borderTop = "none";
        C.style.borderBottom = "none";
      }
    });
  }
}
//Determina si se encuentra por ecnima o debajo de la tarjeta con la que colisiona
function determineIfPosInferiorOrSuperior(CardInSection,cardSetInSection){
  
    const rectC1 = CardInSection.getBoundingClientRect();
    //rectC.left: posicion en X.
    //scrollX: indica cuánto se ha desplazado la ventana horizontalmente desde su posición inicial.
    //const posComponentX1  = rectC1.left + window.scrollX;
    const posComponentY1 = rectC1.top + window.scrollY;

    const rectC2 = cardSetInSection.getBoundingClientRect();
    //rectC.left: posicion en X.
    //scrollX: indica cuánto se ha desplazado la ventana horizontalmente desde su posición inicial.
    //const posComponentX2  = rectC2.left + window.scrollX;
    const posComponentY2 = rectC2.top + window.scrollY;

    if(posComponentY2 < posComponentY1 + rectC1.height/2){
      return "above";
    }else if(posComponentY2 > posComponentY1 + rectC1.height/2){
      return "under";
    }

    return "half";

}
//Impacta/inserta en la posicion preveimante determinada y especificada en atributos del mismo.
function handleImplementPosCardInSection(componente){

    if(componente.getAttribute("moving") == "true"){
      
      let keySectionCollision = parseInt(componente.getAttribute("keySectionCollision"));
      console.log(keySectionCollision);
      let keyCardCollision = parseInt(componente.getAttribute("keyCardCollision"));
      let posCard = componente.getAttribute("posCardCollision");

      let sectionCollisioned = document.querySelector(".section[key='"+ keySectionCollision +"']");
      console.log("Section colisioned : ",sectionCollisioned);
      if(sectionCollisioned){
        let cardContainerOfSectionCollision = sectionCollisioned.querySelector(".cards-container");
        let cardsIntoSectionCollision = cardContainerOfSectionCollision.querySelectorAll(".card");
        console.log("Section Colision : ",sectionCollisioned," cards number : ",cardsIntoSectionCollision);

        if(cardsIntoSectionCollision.length > 0 && keyCardCollision !== null){
          cardsIntoSectionCollision.forEach(card => {
            if(posCard == "above"){

                  let keyCurrent = parseInt(card.getAttribute("key"));

                  if(keyCurrent >= keyCardCollision){
                    card.setAttribute("previousKey", keyCurrent);
                    card.setAttribute("key",(keyCurrent+1));
                  }

            }else if(posCard == "under"){

                let keyCurrent = parseInt(card.getAttribute("key"));
                if(keyCurrent > keyCardCollision){
                  card.setAttribute("previousKey", keyCurrent);
                  card.setAttribute("key", (keyCurrent+1));
                }
            }
          });

          componente.setAttribute("previousKey",componente.getAttribute("key"));
          if(posCard == "above"){

            componente.setAttribute("key", keyCardCollision);
            let cardExsistente = cardContainerOfSectionCollision.querySelector(".card[key='"+ (keyCardCollision + 1) +"']");

            cardContainerOfSectionCollision.insertBefore( 
              componente,  
              cardExsistente 
            );

          }else if(posCard == "under"){

            componente.setAttribute("key", keyCardCollision + 1);
            let cardExsistente = cardContainerOfSectionCollision.querySelector(".card[key='"+ (keyCardCollision + 2) +"']");

            if(cardExsistente){
              cardContainerOfSectionCollision.insertBefore( 
                componente,  
                cardExsistente 
              );

            }else{
              cardContainerOfSectionCollision.appendChild(componente);
            }
          }
        }else {
          cardContainerOfSectionCollision.appendChild(componente);
        }

        resetCardBorderToOriginal(cardsIntoSectionCollision);

      }
      //Restableciendo propiedades de la tarjeta a la previa al movimiento
      componente.style.top = "0px";
      componente.style.left = "0px";
      componente.style.position = "relative";
      componente.setAttribute("moving", false);
      sectionCollisioned.classList.remove('shadow-lg');
    }

}
function resetCardBorderToOriginal(cards){
  cards.forEach(C => {
    C.style.borderTop = "none";
    C.style.borderBottom = "none";
  });
}
function handleClickMoveUpdateKeysOfCardsInSectionOrigin(componente){
//Update keys de cards section dejada por la tarjeta
let conainerCardsOrigen  = componente.parentNode.querySelectorAll(".card");
  
  if(conainerCardsOrigen.length > 0){
    conainerCardsOrigen.forEach(c => {

      let keyCardPrevioSection = c.getAttribute("key");
      if(keyCardPrevioSection > componente.getAttribute("previousKey")){
        c.setAttribute("key", parseInt(keyCardPrevioSection)-1 );
      }
      
    });
  }

}
function detecteCollision(component1, component2){

  const rectC1 = component1.getBoundingClientRect();
  //rectC.left: posicion en X.
  //scrollX: indica cuánto se ha desplazado la ventana horizontalmente desde su posición inicial.
  const posComponentX1  = rectC1.left + window.scrollX;
  const posComponentY1 = rectC1.top + window.scrollY;

  const rectC2 = component2.getBoundingClientRect();
  //rectC.left: posicion en X.
  //scrollX: indica cuánto se ha desplazado la ventana horizontalmente desde su posición inicial.
  const posComponentX2  = rectC2.left + window.scrollX;
  const posComponentY2 = rectC2.top + window.scrollY;

  let distance = {
    X:(posComponentX1 + rectC1.width/2) - (posComponentX2 + rectC2.width/2),
    Y:(posComponentY1 + rectC1.height/2) - (posComponentY2 + rectC2.height/2)
  };

  if(posComponentX1 < posComponentX2 + rectC2.width &&
    posComponentX1 + rectC1.width > posComponentX2 &&
    posComponentY1 < posComponentY2 + rectC2.height &&
    posComponentY1 + rectC1.height > posComponentY2){
    return {collision:true, distance: Math.sqrt(distance.X + distance.Y)};
  }

  return {collision:false , distance: Math.sqrt(distance.X + distance.Y)};
}




function attachCardEventHandlers(componente){
  componente.querySelector(".btnMoveCard").addEventListener("click", (event)=>{
    handleClickMoveUpdateKeysOfCardsInSectionOrigin(componente);
    let keyCurrentSection = componente.parentNode.getAttribute("key"); 
    handleClickMoveComponent(event,componente, handleDetermineCardPositionInMoving,[keyCurrentSection]);
  });

  document.addEventListener( "mouseup", ()=> handleImplementPosCardInSection(componente) );

  const miDiv = componente.querySelector('#miDiv');        
  miDiv.addEventListener('click', function() {
    const miModal = componente.querySelector('#miModal');
    miModal.classList.add('show');
    miModal.classList.remove('fade');
    miModal.setAttribute('style', 'display: block');
  });

  componente.querySelector(".btnDeleteCard").addEventListener("click", ()=>{
    let confirmacion = confirm("¿Estás seguro que desea eliminar esta tarjeta?");
    if(confirmacion){   
        componente.remove();    
    }

  });

  //-----------------------------------------------
  let modal = componente.querySelector(".modal");
  let btnSaveModal = modal.querySelector('[key="btnSaveModal"]');
  btnSaveModal.addEventListener("click", ()=> {
    syncModalWithCard();
    modal.setAttribute('style', 'display: none');
  });
  syncModalWithCard();

  function syncModalWithCard(){
    let titleModal = modal.querySelector(".modal-title");
    modal.parentNode.querySelector(".card-title").textContent = titleModal.textContent;

    let checks = modal.querySelectorAll(".checkBox");
    let checksTrue = 0;
    let labelCheckControl;
    
    if(checks.length > 0){
      checks.forEach(ckeck => {
        if(ckeck.checked){ checksTrue++; }
      });
      labelCheckControl = "Checks: "+checksTrue+"/"+checks.length;
    }else{
      labelCheckControl = "Checks: 0/0"
    }
    modal.parentNode.querySelector(".chacksCount").textContent = labelCheckControl;
  }

  let btnClose  = modal.querySelector('.btn-close');
  btnClose.addEventListener("click", () =>{
    modal.setAttribute('style', 'display: none');
  });
  
  let containerCheckList = modal.querySelector(".Container-Check-list");
  let btnAddCheckList  = modal.querySelector('[key="btnAddCheckList"]');
  btnAddCheckList.addEventListener("click", () => { handleClickAddCheckList(containerCheckList); });
    let btnCloseModal = modal.querySelector('[key="btnCloseModal"]');
    btnCloseModal.addEventListener("click", ()=> {
      modal.setAttribute('style', 'display: none');
  });

  let titleElement = modal.querySelector(".modal-title");
  titleElement.addEventListener('blur', function() {
    if(titleElement.textContent.length < 2){ titleElement.textContent = "Insert title" }
  });

}

function attachSectionEventHandlers(componente){
  let btnAddCard = componente.querySelector('[key="btnAddCard"]');
  let containerCards = componente.querySelector('.cards-container');

  btnAddCard.addEventListener("click", ()=> {
    let keyCard = containerCards.children.length + 1;
    let modal = card( keyCard, "Title", modalOfCard("Title","") );
    attachCardEventHandlers(modal);
    containerCards.appendChild(modal) ;
  });

  let btnDeleteSection = componente.querySelector('.btnDeleteSection');
  btnDeleteSection.addEventListener("click", ()=> {

    let confirmacion = confirm("¿Estás seguro que desea eliminar esta seccion? \n Se eliminaran todas las tarjetas en ella");
    if(confirmacion){
      let keySectionDelete = componente.getAttribute("key");
      componente.parentNode.querySelectorAll(".section").forEach(section =>{
        let currentKey = section.getAttribute("key");
        if(currentKey > keySectionDelete){
          section.setAttribute( "key", parseInt(currentKey)-1 );
        }
      });

      componente.remove();
    }

  });

  let titleElement = componente.querySelector(".section-title");
  titleElement.addEventListener('dblclick', ()=>{
    titleElement.setAttribute("contenteditable",true);
  });
  
  titleElement.addEventListener('blur', function() {
    if(titleElement.textContent.length < 2){ titleElement.textContent = "Insert title" }
    titleElement.setAttribute("contenteditable",false);
  });
}

function attachContainerSectionsEventHandlers(componente){
  componente.querySelector(".btnAddSection").addEventListener("click",()=>{

    let sections = componente.querySelector(".sections");
    let s = section(sections.children.length + 1, "Click change title", null, attachSectionEventHandlers);
    sections.appendChild(s);

  });
  const observer = new MutationObserver((mutationsList, observer) => {
    console.log("Se detectaron cambios");
    SaveStatus.setState(SaveStatus.STATES.CHANGE);
  });
  observer.observe(componente.querySelector(".sections"),{ 
                  childList: true,
                  subtree: true, // Esto observará todos los descendientes del nodo de destino
                  //attributes: true, // Observar cambios en los atributos de los nodos
                  characterData: true // Observar cambios en el contenido de texto de los nodos
  });
}

function attachNavEventHandlers(componente){
  componente.querySelector(".btnAddWorkSpace").addEventListener("click",async ()=>{
    const nameNewWorkSpace = window.prompt('Ingrese el nombre del nuevo WorkSpace a ser creado .. \n NOTA: El nombre no puede ser uno exsistente');
    if(nameNewWorkSpace){
      let result = await addWorkSpace({ name: nameNewWorkSpace, sections:[] });
      if(!result){ return; }

      let containerNameWorkSpaces = componente.querySelector(".workspaces");
      let firselement = containerNameWorkSpaces.firstChild;
      containerNameWorkSpaces.insertBefore(navItemWorkSpace(nameNewWorkSpace),firselement);
    }
  });

  const observer = new MutationObserver((mutationsList, observer) => {
    //console.log("Mutaciones: ",mutationsList," Observer: ", observer);
    let btnItemsWorkSpace = componente.querySelectorAll(".btnNameWorkSpace");
    if(!btnItemsWorkSpace || btnItemsWorkSpace.length < 0){return;}
    btnItemsWorkSpace.forEach(btn => {
      btn.addEventListener( "click", async ()=>{await changeWorkSpace(btn);} );
    });
  });
  observer.observe(componente.querySelector(".workspaces"),{ childList: true });

  async function changeWorkSpace(btn){
    const currentWorkSpace = componente.querySelector(".current-workspace");
    if(currentWorkSpace.textContent == btn.textContent){ 
      return; 
    }

    if(saveStatus != SaveStatus.STATES.SAVE){
      window.alert("Espera a que sean guardados los cambios del actual workspace ..");
      return;
    }
    currentWorkSpace.textContent = btn.textContent;
    let workSpace = await readWorkSpace(btn.textContent);
  
    if(workSpace){
      clearDomWorkspace();
      loadWorkSpaceToDom({"name":workSpace.name, "sections":workSpace.sections});

      setTimeout(()=>{
        SaveStatus.setState(SaveStatus.STATES.SAVE);
      }, 300);
    }
  }

  function updateStateSaveNav(sateSave){
      const stateSaveNav = document.querySelector("nav .stateSave");

      stateSaveNav.classList.remove("text-warning");
      stateSaveNav.classList.remove("text-danger");
      stateSaveNav.classList.remove("text-success");
    
      if(!sateSave  || sateSave != "1" && sateSave != "2" && sateSave != "3" && sateSave != "4"){
        sateSave = "3";
      }
    
      if(sateSave == "1"){
        stateSaveNav.textContent = "💾 Guardado";
        stateSaveNav.classList.add("text-success");
        //Antes de iniciar el save (en proceso de guardado a la espera de respuesta)
      }else if(sateSave == "2"){
        //Peticion de guardado finalizado y no se produjo evento de cambios en el workSpace
        stateSaveNav.textContent = "💾 Guardando . . .";
        stateSaveNav.classList.add("text-warning");
      }else if(sateSave == "3"){
        stateSaveNav.textContent = "💾 Esperando a guardar cambios detectados..";
        stateSaveNav.classList.add("text-danger");
        //En proceso de guardado pero se produce evento de cambio no enviado en peticion de gaurdado actual
      }else if(sateSave == "4"){
        window.alert("Se a producido un error al intentar guardar los cambios, recarge la pagina(El ultimo cambio realizadp se perdera) ");
        stateSaveNav.textContent = "💾 Error(recargar pagina)";
        stateSaveNav.classList.add("text-danger");
      }
  }

  SaveStatus.subscribe(updateStateSaveNav);

} 


//                  ------------- CARGA INICIAL DE LA PAGINA HOME -----------------

async function loadHome(){
  const home = document.createDocumentFragment();
  //TODO: Hacer que solo sea necesario utilizar para la creacion una sola vez "attachNavEventHandlers"
  const nav = navHome();
  attachNavEventHandlers(nav);
  home.appendChild(nav);

  let container = containerSections();
  attachContainerSectionsEventHandlers(container);
  home.appendChild(container);
  
  document.body.appendChild(home);
  
  //---------------------------------------
  const navItems = document.createDocumentFragment();
  const workSpaces = await readAllWorkSpace();

  const arrayWorkSpace = workSpaces[0].WorkSpaces;
  arrayWorkSpace.forEach(ws => {
    if(ws){
      navItems.appendChild(navItemWorkSpace(ws.name, attachNavItemWorkSpaceEvents));
    }
  });

  loadWorkSpaceToDom(arrayWorkSpace[0]);
  let navWorkSpaces = document.querySelector(".nav .workspaces");
  navWorkSpaces.insertBefore(navItems,navWorkSpaces.firstChild);
  let itemNavCurrentWorkSpace = document.querySelector(".nav .current-workspace");
  itemNavCurrentWorkSpace.textContent = arrayWorkSpace[0].name;

  setTimeout(()=>{
    SaveStatus.setState(SaveStatus.STATES.SAVE);
  }, 300);
  //----------------------------------------------

  let owner = await readOwner();
  nav.querySelector(".nav").appendChild(navItemProfileUser(owner.name, owner.email));// ="👤 "+owner.name;
  const intervalo = setInterval(saveWorkSpace, 15000);
  //clearInterval(intervalo);
}

async function saveWorkSpace(){
  
  if(saveStatus != SaveStatus.STATES.CHANGE || saveStatus == SaveStatus.STATES.SAVE){
    return;
  }
  SaveStatus.setState(SaveStatus.STATES.SAVING);
  const workSpace = getWorkSpaceOfDOM();
  let result = await updateWorkSpace(workSpace);

  if(!result || !result.result){
    SaveStatus.setState(SaveStatus.STATES.ERROR);
    return;
  }

  if(saveStatus != SaveStatus.STATES.CHANGE){
    SaveStatus.setState(SaveStatus.STATES.SAVE);
  }
}

function getWorkSpaceOfDOM(){
  let sections = document.querySelectorAll(".section");

  let workSpace = {
    name: document.querySelector(".current-workspace").textContent,
    sections:[]
  }

  if(sections && sections.length > 0){

    sections.forEach(section =>{

      let position = parseInt(section.getAttribute("key"));
      let title = section.querySelector(".section-title").textContent;
      let cards = [];

      let cardsOfDom = section.querySelectorAll(".card")
      if(cardsOfDom && cardsOfDom.length > 0){
        cardsOfDom.forEach(card => {
          let C = {
            "position": parseInt(card.getAttribute("key")),
            "title": card.querySelector(".card-title").textContent,
            "note": card.querySelector(".modal .notes").value,
            "checksList":[]
          }

          let chekListOfDom = card.querySelectorAll(".check-list");
          if(chekListOfDom && chekListOfDom.length > 0){
            chekListOfDom.forEach(chList =>{

              let checklist = {
                "title": chList.querySelector(".title-check-list").textContent,
                //"position":parseInt(chList.getAttribute("key")),
                "tasks":[]
              }
              let tasks = chList.querySelectorAll(".check-item");
              if(tasks && tasks.length > 0){
                tasks.forEach(task => {

                  let T = {
                    "task": task.querySelector(".taskText").value,
                    "check": task.querySelector(".checkBox").checked,
                  }
                  checklist.tasks.push(T);

                });
              }

              C.checksList.push(checklist);
            });


          }
          cards.push(C);
        });
      }

      workSpace.sections.push({position, title, cards});
    });

  }

  return workSpace;
}

function loadWorkSpaceToDom(workSpace){
  const sections = document.createDocumentFragment();

  workSpace.sections.forEach(sect => {

    const cards = document.createDocumentFragment();
    if(sect.cards && sect.cards.length > 0){
      sect.cards.forEach(c =>{ 

        let checkListsFragment = document.createDocumentFragment();
        if(c.checksList && c.checksList.length > 0){
          c.checksList.forEach(chl =>{

              if(chl.tasks && chl.tasks.length > 0){
                let checklist = checkList(chl.title, chl.position);
                let containerCheckItem = checklist.querySelector(".container-item-check");
                let countItem = 0;
                chl.tasks.forEach(task =>{
                  console.log(task.task," -- ",task.check);
                  containerCheckItem.appendChild(checkItem(task.task, task.check, countItem++));
                });
                checkListsFragment.appendChild(checklist);
              }
          });

        }
      let modal = modalOfCard(c.title, c.note, checkListsFragment);
      let newCard = card(c.position, c.title, modal);
      attachCardEventHandlers(newCard);
      cards.appendChild(newCard);
      });
    }
    let s = section(sect.position, sect.title, cards, attachSectionEventHandlers);
    sections.appendChild(s);
  });

  document.querySelector(".sections").appendChild(sections);
}

function clearDomWorkspace(){
  let containerSections = document.querySelector(".container-sections");
  containerSections.querySelector(".sections").innerHTML = "";
}

loadHome();


