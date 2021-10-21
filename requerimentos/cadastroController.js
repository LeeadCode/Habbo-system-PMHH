const express = require('express')
const { route } = require('../promocoes/promocaoController')
const usuario = require('../usuarios/usuario')
const requerimento = require('./requerimentoCadastro')
const autorizado = require('../middlewares/login')
const router = express.Router()

// Variaveis

var erro = ''

// rotas

// Página de requerimento
router.get('/cadastrar', autorizado, (req, res) => {
  var fkid = req.session.usuario.id
  res.render('requerimentos/cadastros/cadastroUsuario', {
    fkid: fkid,
    erro: erro
  })
  erro = ''
})

// Listagem do SRH
router.get('/lista/cadastro/:status', autorizado, (req, res) => {
  var status = req.params.status

  requerimento
    .findAll({
      include: [
        { model: usuario, as: 'requerente' },
        { model: usuario, as: 'srh' }
      ],
      where: { status: status },
      order: [['createdAt', 'ASC']]
    })
    .then(requerimento => {
      res.render('requerimentos/cadastros/listagemUsuario', {
        requerimento: requerimento,
        status: status
      })
    })
})

// Rotas Post

// Rota para Salvar Requerimento
router.post('/cadastro/save', async (req, res) => {
  var nick = req.body.nick
  var patente = req.body.patente
  var id = req.session.usuario.id

  if (nick.trim().length < 3 || nick.trim() == '') {
    erro = 'Nick Inválido!'
  } else {
    let verificaCadastro = await usuario.findOne({ where: { nick: nick } })

    if (verificaCadastro != undefined) {
      erro = 'Usuário já cadastrado!'
      res.redirect('/cadastrar')
    } else {
      requerimento.create({
        patente: patente,
        tipo: retornaTipo(patente),
        nick: nick,
        status: 'Pendente',
        idRequerente: id,
        data: retornaData(new Date())
      })
    }
  }
})

// Aprovar requerimento
router.post('/requerimento/aprovado', (req, res) => {
  var id = req.body.id

  requerimento.findByPk(id).then(requerimento => {
    usuario.create({
      nick: requerimento.nick,
      patente: requerimento.patente,
      tipo: requerimento.tipo,
      usuarioId: requerimento.idRequerente,
      status: 'Ativo'
    })
    requerimento.update(
      { idSrh: req.session.usuario.id, status: 'Aprovado' },
      {
        where: { id: id }
      }
    )
  })
  res.redirect('/lista/cadastro/pendente')
})

// Rejeitar Requerimento
router.post('/requerimento/rejeitado', (req, res) => {
  var id = req.body.id

  requerimento.update(
    { idSrh: req.session.usuario.id, status: 'Rejeitado' },
    {
      where: { id: id }
    }
  )
  res.redirect('/lista/cadastro/pendente')
})

function retornaTipo(pPatente) {
  if (pPatente == 'Soldado') {
    return 'Militar'
  } else return 'Executivo'
}
module.exports = router

function retornaData(pData) {
  const meses = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ]
  let data = new Date(pData)
  let dataFormatada =
    data.getDate() + ' ' + meses[data.getMonth()] + ' ' + data.getFullYear()
  return dataFormatada
}

// usuario.create({
//   nick: nick,
//   patente: patente,
//   usuarioId: id,
//   tipo: retornaTipo(patente),
//   status: 'Pendente'
// }).then(()=>{
//   res.redirect('/cadastrar')
// })
