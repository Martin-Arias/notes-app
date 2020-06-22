const { Router } = require('express');
const router = Router();  //Permite nombrar las rutas

const {renderAbout,renderIndex } = require('../controllers/index.controllers')

router.get('/', renderIndex);

router.get('/about',renderAbout);

module.exports = router;