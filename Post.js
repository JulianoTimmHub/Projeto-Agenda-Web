const db = require('./db')

const Post = db.sequelize.define('agenda', {
    nome_contato: {
        type: db.Sequelize.STRING
    },
    numero_contato: {
        type: db.Sequelize.STRING
    }
})

Post.sync({ force: false })

module.exports = Post   