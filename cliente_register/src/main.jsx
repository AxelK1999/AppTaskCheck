import React from 'react'
import ReactDOM from 'react-dom/client'

//import './index.css'
import '../public/css/bootstrap.min.css'
import Register from './register.jsx'

const urlParams = new URLSearchParams(window.location.search);
const ruta = urlParams.get('page');
console.log(urlParams.get('dominioServer'));
console.log(ruta);

/*switch(ruta){}
https://reactrouter.com/en/main/route/route*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
     <Register></Register>
  </React.Fragment>
);
