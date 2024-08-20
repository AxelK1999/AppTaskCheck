import { modal } from "./modal.mjs";
import { escapeHTML } from "./escape.mjs";

import {changeName, deleteWorkSpace} from '../requests.mjs';

export function navHome(){
    let componentHTML = `
        <nav>
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active current-workspace" aria-current="page" href="#">WorkSpace</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Spaces</a>
                <ul class="dropdown-menu workspaces">
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item btnAddWorkSpace text-success" href="#">New WorkSpace</a></li>
                </ul>
              </li>
              <li class="nav-item stateSave mt-2 mx-auto text-success">💾 saved </li>
            </ul>
      </nav>`;
  
    let contenedor = document.createElement('div');
    contenedor.innerHTML = componentHTML;
    let componente = contenedor.firstElementChild;
    return componente;
}

export function navItemWorkSpace(txt, functAttachEvents){
    let componentHTML = 
    `<li class="d-flex flex-row">
      <a class="dropdown-item btnNameWorkSpace mb-1 mt-1" href="#">${txt}</a>
      <a class="btnDeleteWorkSpace btn btn-outline-danger me-3 mx-2 mb-1 mt-1"><img src="icons/trash3-fill.svg" height="13px"></a>
    </li>`;
    let contenedor = document.createElement('div');
    contenedor.innerHTML = componentHTML;
  
    let componente = contenedor.firstElementChild;
    if(functAttachEvents){
      functAttachEvents(componente);
    }
  
    return componente;
}

export function attachNavItemWorkSpaceEvents(componente){
    componente.querySelector(".btnDeleteWorkSpace").addEventListener("click",async ()=>{
      const nameNewWorkSpace = componente.querySelector(".btnNameWorkSpace").textContent;
      let confirmacion = confirm("¿ Estás seguro que desea eliminar este WorkSpace : "+nameNewWorkSpace+" ?"
                                +"\nNota: debe tener mas de 1 workspace creado para eliminar uno");
      if(confirmacion){
        let success = await deleteWorkSpace(nameNewWorkSpace);
        
        if(success.result){
          componente.remove();
          location.reload();
        }
      }
      
    });
}

export function navItemProfileUser(name, email){
    let componentHTML = `
      <li class="nav-item me-3  user">
        <a class="userTxt text-decoration-none btn"><strong>👤 ${escapeHTML(name)}<strong></a> 
        <div class="modalOfItem"></div>
      </li>`;
  
    let contenedor = document.createElement('div');
    contenedor.innerHTML = componentHTML;
    let componente = contenedor.firstElementChild;
    
    let buttonSaveHTML = `<button type="button" class="btn btn-primary" key="btnSaveModal">Save changes</button>`;
    let bodyModalHTML = `
            <div class="container">
              <div class="table-responsive mt-3">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th name = "email">Email</th>
                      <td><input type="email" class='border-0 email' readonly currentvalue = " ${email}" value=" ${email}"></td>
                    </tr>
                  
                    <tr>
                      <th name = "username" >Username</th>
                      <td><input type="text" class='border-0 name' currentvalue = " ${name}" value=" ${name}"></td>
                    </tr>
                  </tbody>
                </table> 
                <button type="button" class="btn btn-outline-danger btnEndSesion">Cerrar sesion</button> 
              </div>
            </div>`;
  
        contenedor = document.createElement('div');
        contenedor.innerHTML = buttonSaveHTML;
        let buttonSave = contenedor.firstElementChild;
  
        contenedor = document.createElement('div');
        contenedor.innerHTML = bodyModalHTML;
        let bodyModal = contenedor.firstElementChild;
  
        bodyModal.querySelector(".btnEndSesion").addEventListener("click", async()=>{
          let confirmacion = confirm("¿ Seguro desea cerrar la sesion actual ?");
          if(confirmacion){
            window.location.href = "../auth/logout";
          }
        });
  
    let M = modal.createModal("Perfil", bodyModal, buttonSave);
    componente.querySelector(".modalOfItem").appendChild(M);
    componente.querySelector(".userTxt").addEventListener("click",() => modal.showModal(M));
  
    buttonSave.addEventListener("click", async()=>{
      let nameUpd = bodyModal.querySelector(".name").value;
      await changeName(nameUpd);
      componente.querySelector(".userTxt strong").textContent ="👤 "+nameUpd;
      M.setAttribute('style', 'display: none');
    });
  
    return componente;
}
  