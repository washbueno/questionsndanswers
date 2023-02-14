const Sequelize = require('sequelize'); // importando sequelize
// variável connection que recebe sequelize passando os seguintes parâmetros:
//bancos de dados, usuário e senha
const connection = new Sequelize('guiaperguntas', 'root', 'root', {
    host: 'localhost', //IP
    dialect: 'mysql'    //dialeto
});

module.exports = connection; // Exportação