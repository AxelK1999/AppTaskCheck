import { escapeHTML } from "./escape.mjs";

export function section(key, title, cardsFragment, functAttachEvents){

    let componentHTML =`
      <div class="text-center me-3 mx-3 section rounded" key = "${key}" style="width: 20rem;">
  
       <div class="d-flex flex-row">
          <h4 class="section-title mt-1">${escapeHTML(title)}</h4>
  
          <div class="btn-group ms-auto" role="group">
            <button type="button" data-bs-toggle="dropdown" aria-expanded="false"><h4> ≡ </h4></button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item btnDeleteSection" href="#"> Delete <img src="icons/trash3-fill.svg" class="mx-2 me-0" height="13px"> </a></li>
              <li><a class="dropdown-item btnMoveSection" href="#"> Move </a></li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="cards-container mt-5 w-75 mx-auto" style="background:#f1f1f0"> </div>
        <button type="button" class="btn btn-outline-secondary mt-3 mb-2" key="btnAddCard" style="width: 15rem;">Tarjeta +</button>
      </div>`;
  
    let contenedor = document.createElement('div');
    contenedor.innerHTML = componentHTML;
  
    let componente = contenedor.firstElementChild;
  
    if(cardsFragment){
      componente.querySelector(".cards-container").appendChild(cardsFragment);
    }
  
    if(functAttachEvents){
      functAttachEvents(componente);
    }
  
    return componente; 
  
}

export function containerSections(){
    let componentHTML =`
    <div class = "d-flex flex-row container-sections mt-4">
      <div class="sections d-flex flex-row"></div>
      <button type="button" class="btn btn-outline-secondary me-3 mx-3 mt-4 pt-2  btnAddSection" style="width: 15rem;">Añadir Seccion +</button>
    </div>`;
  
    let contenedor = document.createElement('div');
    contenedor.innerHTML = componentHTML;
    let componente = contenedor.firstElementChild;
  
    return componente;
}
