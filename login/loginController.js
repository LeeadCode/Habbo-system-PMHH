const express  = require('express')
const router   = express.Router()
const logins   = require('./login')
const usuarios = require('../usuarios/usuario')
const bcrypt   = require('bcryptjs')
const axios    = require('axios')

var validador = geraStringAleatoria(5)
var erro      = ''
var sucesso   = ''

// *** Rota para Logar Usuário ***
router.get('/login', (req, res) => {
  res.render('login/login', {
    erro   : erro,
    sucesso: sucesso
  })
  erro    = ''
  sucesso = ''
})

// Validando usuario e logando
router.post('/login/validacao', (req, res) =>{
  var login = req.body.login
  var senha = req.body.senha

  logins.findOne({ where:{ login: login }}).then( log => {
    if(log != undefined){
      var correto = bcrypt.compareSync(senha, log.senha)

      if(correto){
        usuarios.findOne({ where: { id: log.usuarioId } }).then( user =>{ 
          req.session.usuario = {id: user.id}
          res.redirect('/')
        })
      }else{
        erro = 'Login inválido!'
        res.redirect('/login')        
      }
    }else{
      erro = 'Login inválido!'
      res.redirect('/login')
    }
  })
})




// *** Rota para cadastrar usuários ***
router.get('/cadastro', (req, res) => {
  res.render('login/cadastro', { 
    validador: validador,
    erro     : erro
  })
  erro = ''
})

// validando usuario e cadastrando no banco
router.post('/cadastro/validacao', (req, res) => {
  var login = req.body.login
  var senha = req.body.senha

  String.toString(login.trim())

  // Escondendo senha
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(senha, salt)
 
  let v = VerificarMissao(login, validador)
  let l = logins.findOne({where:{login: login}})
  let u = usuarios.findOne({where:{nick: login}})
  let c = logins
 
    l.then( log => {if(log == undefined){
      v.then( consultaMissao => {if(consultaMissao == true){
        u.then( usuario => {if(usuario != undefined){
          c.create({
            login: login,
            senha: hash,
            usuarioId: usuario.id
          }).then(sucesso = 'Cadastrado com Sucesso!', res.redirect('/login'))
        }else{
          erro = 'Usuário não autorizado!'
          res.redirect('/cadastro')     
        }})
      }else{
        erro = 'Verifique sua missão!'
        res.redirect('/cadastro')        
      }})
    }else{
      erro = 'Usuário já cadastrado!'
      res.redirect('/cadastro')
    }
  })
})




function VerificarMissao(nick, missao){
  return new Promise((resolve, reject) => {
    axios.get('https://www.habbo.com.br/api/public/users?name='+nick+'').catch((a) => {
      console.log(a)
    }).then((resposta) => {
      missaoString = resposta.data.motto
      JSON.stringify(missaoString)
      console.log(missaoString)

      if(missao == missaoString){
        console.log('Certo!')
        resolve(true)
      }else{
        resolve(false)
      }
    }).catch(() =>{
      return false
    })
  })
}


  // Gerar string aleatória para autenticar via missão
  function geraStringAleatoria(tamanho) {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return 'PMHH@'+stringAleatoria;
}

module.exports = router