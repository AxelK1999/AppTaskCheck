export const DOMAIN_SERVER = "http://localhost:3000";

export async function sendRegister(body){
    try {
        let url = DOMAIN_SERVER + "/api/1.0/auth/registerM"

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        const responseData = await response.json(); // Convertir la respuesta en JSON si es necesario
        console.log(responseData);
        return responseData;
      } catch (error) {
        console.error('Error al crear la cuanta:', error);
        return null;
      }
}