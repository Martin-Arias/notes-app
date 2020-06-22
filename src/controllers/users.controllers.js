const userCtrl = {};

const passport = require('passport');

const User = require('../models/User'); //Traigo el modelo para poder almacenar datos

userCtrl.renderSignUpForm = (req,res) => {
    res.render('users/signup');
};

userCtrl.signup = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;

    ///Validaciones
    if(password != confirm_password){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length < 4){
        errors.push({text: 'La contraseña debe tener al menos 4 caracteres'})
    }
    if (errors.length > 0){
        res.render('users/signup',{
            errors,  //Envia el objeto errores a la vista 
            name,  //Almacena nombre y mail para no tener que escribirlo de nuevo en caso de error
            email
        })
    }else {
      const emailUser = await User.findOne({email:email}) //Busco si el email ya esta registrado
      if (emailUser) {
        req.flash('error_msg','El email ya se encuentra registrado!');
        res.redirect('/users/signup')
      }else {
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
       await newUser.save();
       req.flash('success_msg','Usuario Registrado');
       res.redirect('/users/signin'); 
    }  
    }
};



userCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

userCtrl.signin = passport.authenticate('local', { 
    failureRedirect : '/users/signin',
    successRedirect : '/notes',
    failureFlash : true

});

userCtrl.logOut = (req,res) => {
    req.logOut();
    req.flash('success_msg','Cerraste sesion');
    res.redirect('/users/signin')
};

module.exports = userCtrl;