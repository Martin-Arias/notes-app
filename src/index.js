//Archivo principal del proyecto

require('dotenv').config();//Se utiliza para configurar las variables de entorno

const app = require('./server'); //Importo el servidor 

require('./database');

app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port')); //Ejecuta el server 
    
});