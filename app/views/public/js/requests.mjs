//                  --------------- PETICIONES (AJAX) ---------------
 
//const dominio = window.location.host;
//CRUD WorkSpace:
export async function readAllWorkSpace(){
    try {
      const response = await fetch('../workspace/alls');
      if (!response.ok) {
        throw new Error('Error al obtener los workspace del usuario de la API');
      }
      const result = await response.json();
      return result.data;

    } catch (error) {
      return null;
    }
}

export async function updateWorkSpace(WorkSpace){
  try {

    const body = {"WorkSpace" : WorkSpace};
    console.log("Guardado : ",body);

    const response = await fetch('../workspace', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar los datos en la API');
    }
    const responseData = await response.json(); // Convertir la respuesta en JSON si es necesario
    console.log('Datos actualizados en la API:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error al realizar la petición PUT a la API:', error);
    return null;
  }
}

export async function addWorkSpace(WorkSpace){
  try {
    const body = {"WorkSpace" : WorkSpace};
    const response = await fetch('../workspace', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Error al enviar los datos a la API');
    }
    const responseData = await response.json();
    console.log('Nuevo Work space añadido :', responseData);
    return responseData.result;
  } catch (error) {
    window.alert("Se a producido un error al crear el nuevo workspace, verifique que el nombre sea unico");
    return null;
  }
}

export async function readWorkSpace(name){
  try {
    const response = await fetch('../workspace/?nameWorkSpace='+name);
    if (!response.ok) {
      throw new Error('Error al obtener los workspace del usuario de la API');
    }
    const result = await response.json();
    return result.data;

  } catch (error) {
    window.alert("No se a podido leer el workspace !!");
    return null;
  }
}

export async function deleteWorkSpace(name){
  try {
    const response = await fetch('../workspace', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "nameWorkSpace"  :name })
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el workspace');
    }
    const responseData = await response.json(); // Convertir la respuesta en JSON si es necesario
    console.log('Workspace a sido eliminado con exito ', responseData);
    return responseData;
  } catch (error) {
    console.error('Error al realizar la petición DELETE a la API:', error);
    return null;
  }
}

//OWNER:
export async function readOwner(){
  try {

    const response = await fetch('../users/M');
    if (!response.ok) {
      throw new Error('Error al obtener los workspace del usuario de la API');
    }
    const result = await response.json();
    return result.owner;

  } catch (error) {
    window.alert("No se a podido leer el workspace !!");
    return null;
  }
}

export async function changeName(name){
  try {

    const body = {"name" : name};
    console.log("Guardado : ",body);

    const response = await fetch('../users/M', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Error al actualizar los datos en la API');
    }
    const responseData = await response.json(); // Convertir la respuesta en JSON si es necesario
    console.log('Datos actualizados en la API:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error al realizar la petición PUT a la API:', error);
    return null;
  }
}