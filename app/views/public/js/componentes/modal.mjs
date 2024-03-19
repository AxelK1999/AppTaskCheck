import {escapeHTML} from "./escape.mjs";

export const modal = {
    createModal: Modal,
    showModal:showModal
};

function Modal(title, contentBody, contentFooter, functAttachEvents){
  let componentHTML = 
  `<div class="modal mt-5" id="modal" tabindex="-1">
    <div class="modal-content modal-dialog modal-contnet">

        <div class="modal-header modal-contnet-header">
          <h5 class="modal-title">${escapeHTML(title)}</h5>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>

        <div class="modal-body"></div>

        <div class="modal-footer"> </div>

    </div>
  </div>`;

  let contenedor = document.createElement('div');
  contenedor.innerHTML = componentHTML;
  let componente = contenedor.firstElementChild;

  if(contentBody){
    componente.querySelector(".modal-body").appendChild(contentBody);
  }

  if(contentFooter){
    componente.querySelector(".modal-footer").appendChild(contentFooter);
  }
  
  if(functAttachEvents){
    functAttachEvents(componente);
  }

  componente.querySelector(".btn-close").addEventListener("click",()=>{
    componente.setAttribute('style', 'display: none');
  });
  return componente;

}

function showModal(modal){
  modal.classList.add('show');
  modal.classList.remove('fade');
  modal.setAttribute('style', 'display: block');
}

export function modalOfCard(title, note ,checkListsFragment){
    var componentHTML = `
              <div class="modal mt-5 card-body-modal"  id="miModal" tabindex="-1">
                <div class="modal-content modal-dialog modal-contnet">
  
                  <div class="modal-header modal-contnet-header">
                    <h5 class="modal-title" contenteditable="true"></h5>
                    <button type="button" class="btn-close" aria-label="Close"></button>
                  </div>
  
                  <div class="modal-body modal-contnet-body">
                    <h6>Notes</h6>
                    <textarea class="form-control mb-3 rounded shadow-sm notes" rows="4"></textarea>
  
                    <div class="Container-Check-list">
  
                    </div>
  
                    <button type="button" class="btn btn btn-outline-secondary" key="btnAddCheckList">Check List +</button>
                  </div>
  
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" key="btnCloseModal">Close</button>
                    <button type="button" class="btn btn-primary" key="btnSaveModal">Save changes</button>
                  </div>
  
                </div>
            </div>`;
  
    var contenedor = document.createElement('div');
    contenedor.innerHTML = componentHTML;
    var componente = contenedor.firstElementChild;
  
    if(!title){ title="Title" }
    componente.querySelector(".modal-title").textContent = title;
    componente.querySelector(".notes").textContent = note;
  
    let containerCheckList = componente.querySelector(".Container-Check-list");
    if(checkListsFragment){
      containerCheckList.appendChild(checkListsFragment);
    }
  
    return componente;
}
  

