const express = require("express")
const app = express()

// Exportando o BodyParser
const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Exportando o handlebars
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Exportando o arquivo Post.js
const Post = require('./Post')

//1° ROTA HOME
app.get('/home', function (req, res) {
    res.render('home')
})

//2° ROTA CADASTRAR CONTATO                           
app.get('/cadastrar', function (req, res) {
    res.render('cadastro')
})

app.post('/contatoAdicionado', function (req, res) {
    Post.create({
        nome_contato: req.body.nome,
        numero_contato: req.body.numero
    }).then(function () {
        res.send('Post criado com sucesso!')
    }).catch(function (erro) {
        res.send('Falha ao criar o post' + erro)
    })
})

//3° ROTA LISTAR CONTATOS  
app.get('/listar', function (req, res) {
    Post.findAll().then(function (contatos) {
        res.render('listar', { posts: contatos })
    })
})

//4° ROTA EDITAR CONTATOS
app.get('/editar/:id', function (req, res) {
    Post.findByPk(req.params.id).then(post => {
        res.render('alterar', {
            id: req.params.id,
            nome_contato: post.nome,
            numero_contato: post.numero
        })
    }).catch(erro => {
        res.send('<h3>Post não encontrado!</h3>')
    })
})
app.post('/alterado/:id', function (req, res) {
    Post.update({
        nome_contato: req.body.nome,
        numero_contato: req.body.numero
    },
        {
            where: { id: req.params.id }
        }).then(function () {
            res.redirect('/listar')
        }).catch(function (erro) {
            console.log(erro);
        })
})

//5° ROTA DELETAR CONTATOS
app.get('/deletar', function (req, res) {
    Post.findAll().then(function (contatos) {
        res.render('excluir', { posts: contatos })
    })
})

app.get('/deletar/:id', function (req, res) {
    Post.destroy({ where: { 'id': req.params.id } }).then(function () {
        res.send('Contato excluido com sucesso!')
    }).catch(function (erro) {
        res.send('Este contato não existe!' + erro)
    })
})

// COLOCANDO O SERVIDOR NO AR
app.listen(8001, function () {
    console.log('Servidor rodando na URl http://localhost:8001')
})