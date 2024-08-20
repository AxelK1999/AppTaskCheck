import { escapeHTML } from "./escape.mjs";

// intems, check list, card
export function checkItem(text = '', boolChek, key){

    let componentHTML = `
      <div class="form-check mt-2 check-item" key="${key}" ="false" change="false">
        <input class="form-check-input mt-2 checkBox" type="checkbox" ${boolChek ? 'checked' : ''} id="tareaCheck">
        <div class="btn-group">
          <textarea class="form-control taskText" id="taskText" rows="1" cols="40" placeholder="Input task ...">${escapeHTML(text)}</textarea>
          <button type="button" class="btn btn-danger btn-delete">
            <img src="icons/trash3-fill.svg" height="18px">
          </button>
        </div>
      </div>
    `;

    // Crear un elemento contenedor y establecer su contenido HTML
    let contenedor = document.createElement('div');
    contenedor.innerHTML = componentHTML;

    // Obtener el componente raíz del contenedor
    let componente = contenedor.firstElementChild;

    //Establecemos eventos que tendra nuestro componente
    let btnDeleteList = componente.querySelector(".btn-delete");
    btnDeleteList.addEventListener("click", function(){ 
      let confirmacion = confirm("¿Estás seguro que desea eliminar esta check item?");
      if(confirmacion){
        //componente.setAttribute("", true);
        //componente.style.display = "none";
        componente.remove();
      }
  
    });

    let taskText = componente.querySelector("#taskText");
    taskText.addEventListener("change", function(){
        componente.setAttribute("change", true);
    });

    return componente;
}

export function checkList(tituloCickList, key){
 
   // Crear el componente HTML utilizando plantillas de cadena de texto
   let componentHTML = `
      <div class="form-control mb-3 rounded shadow-sm check-list" key="${key}" ="false" change="false">
        <h6 style="display: inline-block;" class="title-check-list" contenteditable="true" >${escapeHTML(tituloCickList)}</h6>

        <div class="container-item-check"></div>

        <a class="text-decoration-none mx-5 me-5 btn-add-check">Check +</a>
        <a class="text-decoration-none mx-5 btn-delete">Delete check list</a>
      </div>
  `;

  let contenedor = document.createElement('div');
  contenedor.innerHTML = componentHTML;

  let componente = contenedor.firstElementChild;

  //--------------------------------------------

  //Eventos 
  let btnAddCheck = componente.querySelector(".btn-add-check");
  let containerChecks = componente.querySelector(".container-item-check");

  btnAddCheck.addEventListener("click", function(){ 
    handleClickAddCheckItem(containerChecks); 
  });
  let btnDeleteList = componente.querySelector(".btn-delete");
  btnDeleteList.addEventListener("click", function(){ 

      let confirmacion = confirm("¿Estás seguro que desea eliminar esta check list?");
      if(confirmacion){
        //componente.setAttribute("", true);
        //componente.style.display = "none";
        componente.remove();
      }
  });
  let titleCheckList = componente.querySelector(".title-check-list");
 
  titleCheckList.addEventListener("change", function(){ 
      componente.setAttribute("change", true);
  });

  let titleElement = componente.querySelector(".title-check-list");
  titleElement.addEventListener('blur', function() {
    if(titleElement.textContent.length < 2){ titleElement.textContent = "Insert title" }
  });

  return componente;
}

export function card(keyCard, title, modalFragment){
    
  let componentHTML =`
  <div class="card text-start mb-2 mt-2" key="${keyCard}" style="width: 15rem;">
    <div class="card-body">
      <div class="mb-3 card-body-preview" id="miDiv" data-toggle="modal" data-target="#miModal">
        <h5 class="card-title">${escapeHTML(title)}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary chacksCount">Checks: </h6>
      </div>
      <div class="d-flex flex-row">
        <a class="mt-2 text-decoration-none btnDeleteCard">Delete<img src="icons/trash3-fill.svg" class="mx-2 me-0" height="13px"></a>
        <a class="mt-2 text-decoration-none btnMoveCard ms-auto">Move</a>
      </div>
    </div>
  </div>`;

  let contenedor = document.createElement('div');
  contenedor.innerHTML = componentHTML;
 
  let componente = contenedor.firstElementChild;
  componente.querySelector(".card-body").appendChild(modalFragment);

  return componente;
}

function handleClickAddCheckItem(checkList) {
  checkList.appendChild( checkItem("", false, checkList.children.length + 1) );
}

export function handleClickAddCheckList(containerCheckList){
 
  const keyCheckList = containerCheckList.querySelectorAll(".check-list").length + 1;
  containerCheckList.appendChild( checkList("Insert Title (click)" , keyCheckList) );
  
}