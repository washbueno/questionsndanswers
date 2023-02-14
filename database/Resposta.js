const Sequelize = require("sequelize"); //Importando sequelize
const connection = require("./database"); //Importando database

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({ force: false })

module.exports = Resposta;