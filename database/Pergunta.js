const Sequelize = require("sequelize"); //Importando sequelize
const connection = require("./database"); //Importando database

// Const com nomeDaTabela trazendo a conexão e definindo passando como parâmetro o nome da tabela
const Pergunta = connection.define('perguntas', { 
    titulo: { //Nome do campo
        type: Sequelize.STRING, //Tipo
        allowNull: false        // Obrigatório ou não
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Criando a tabela na execução
Pergunta.sync({ force: false }).then(() => { })

module.exports = Pergunta;