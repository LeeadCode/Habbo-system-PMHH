const connection = require('./database/database'),
  session = require('express-session')
const requerimento = require('./requerimentos/requerimentoCadastro')
;(bodyParser = require('body-parser')),
  (express = require('express')),
  (autorizado = require('./middlewares/login')),
  (app = express()),
  (homePageController = require('./homePage/homeController'))
;(categoriesController = require('./categories/categoriesController')),
  (cadastroController = require('./requerimentos/cadastroController')),
  (usersConroller = require('./promocoes/promocaoController')),
  (articlesController = require('./articles/articlesController')),
  (loginController = require('./login/loginController')),
  (category = require('./categories/category')),
  (article = require('./articles/Article')),
  (usuario = require('./usuarios/usuario')),
  (cadastro = require('./login/login')),
  (axios = require('axios'))

// Sessions
app.use(
  session({
    secret: 'dgqvwgdqbwdhjiqklpdqçwdqwaadqwd',
    cookie: { maxAge: 2592000000 }
  })
)

// Static
app.use(express.static('public'))

// View
app.set('view engine', 'ejs')

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DataBase
connection
  .authenticate()
  .then(() => {
    console.log('Connectado com o banco de dados!')
  })
  .catch(erro => {
    console.log(erro)
  })

// Rotas
app.use('/', categoriesController)
app.use('/', articlesController)
app.use('/', cadastroController)
app.use('/', loginController)
app.use('/', usersConroller)
app.use('/', homePageController)

app.listen(8081, () => {
  console.log('Servidor Inicializado!')
})
