/*  Codigo del servidor express  */
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override')
const express = require('express'); //Crea el servidor 
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan'); //Muestra las peticiones en la consola
const passport = require('passport');
//Inicializaciones 
const app = express();  //Inicializa y almacena en app
require('./config/passport');
//Settings
app.set('port',process.env.PORT || 4000); //Seteo el puerto que almaceno en el archivo .env
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({ //Configuro el motor de plantillas
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'

}));
app.set('view engine', '.hbs')

//Middlewares 
app.use(express.urlencoded({ extended: false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Variables Globales
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg'); //Muesta los mensajes en pantalla
  res.locals.error_msg = req.flash('error_msg'); //Muesta los mensajes en pantalla
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
    next();
})


//Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname,'public'))); //Indica donde esta la carpeta de archivos estaticos


module.exports= app; //Exporto app