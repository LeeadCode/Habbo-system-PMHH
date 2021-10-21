const 
  express  = require('express'),
  router   = express.Router(),
  autorizado = require('../middlewares/login'),
  usuarios = require('../usuarios/usuario');
  logins   = require('../login/login')


router.get('/', autorizado, (req, res) => {
  var id = req.session.usuario.id

  usuarios.findByPk(id).then(usuario =>{
    res.render('index', {
      usuario : usuario
    })
  })
  })

module.exports = router