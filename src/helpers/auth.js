const helpers = {}
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        
        return next();
    }
    req.flash('error_msg', 'Debes iniciar sesion para ver esta pagina')
    res.redirect('/users/signin');
}


module.exports = helpers;
