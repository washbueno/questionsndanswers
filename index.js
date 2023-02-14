//Variable to express
const express = require("express"); //Importando express
const app = express(); // inserindo express no app
const bodyParse = require("body-parser"); // Importando body-parse
const connection = require("./database/database") // Importando a conexão
const Pergunta = require("./database/Pergunta"); // Importando o module Pergunta para criação da tabela
const Resposta = require("./database/Resposta"); //Importando module resposta

//Database Connection
connection // chama a conexão 
    .authenticate() //método autenticate
    .then(() => { // then and catch
        console.log("Conexão realizada com sucesso ao banco de dados")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })


//Using
app.set('view engine', 'ejs') // Dizendo ao express que será utilizado como engine o ejs
app.use(express.static('public')) // Utilizar arquivos estáticos CSS por exemplo
app.use(bodyParse.urlencoded({ extended: false })) // Esse comando, irá traduzir os dados enviados pelo html em javascript
app.use(bodyParse.json()); // Ler dados de fórmularios via json utilizado mais com API

//Routes
app.get("/", (req, res) => { //Route home
    //Esse método findAll é equivalente ao select * from
    // O raw para passar apenas os dados crus
    Pergunta.findAll({
        raw: true, order: [ //array order para ordenação da lista
            ['id', 'DESC'] //array para aplicar o campo ASC = Crescente || DESC Decrescente
        ]
    }).then(perguntas => {
        res.render("index", { // Para qual página
            perguntas: perguntas // Campos
        });
    });
});

//Route Anwsers
app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo; // Variável para buscar o título - A busca se da pela class name no ejs
    var descricao = req.body.descricao; // Variável para buscar o descricao - A busca se da pela class name no ejs
    Pergunta.create({ //O método create corresponde ao insert do SQL
        titulo: titulo, //Nesse momento é passado o título da variável que foi buscada no name do html
        descricao: descricao //Nesse momento é passado o título da variável que foi buscada no name do html
    }).then(() => { //O then caso passe vai redirecionar para a página inicial
        res.redirect("/");
    });
})

//Route Pergunta and respostas
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({ //Localização de Uma Pergunta
        where: { id: id } // Where semelhante de SQL Where id corresponda ao mesmo ID
    }).then(pergunta => {
        if (pergunta != undefined) { // Pergunta encontrada

            Resposta.findAll({ //Localizar dentro da variável resposta tudo onde
                where: { perguntaId: pergunta.id }, // onde a pergunta ID da tabela resposta corresponda da tabela pergunta
                order: [
                    ['id', 'DESC'] // Ordenação por Id decrescente
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta, // Passando perguntas e respostas para filtrar na tela
                    respostas: respostas
                });
            });

        } else { // Não encontrada redireciona
            res.redirect("/");
        }
    });
})

//Route postar pergunta

app.post("/responder", (req, res) => {  // Página responder
    var corpo = req.body.corpo;         // Guarda na variável corpo os dados do campo corpo
    var perguntaId = req.body.pergunta; // Guarda na variável o id da pergunta
    Resposta.create({                   // O método create corresponde ao insert do SQL
        corpo: corpo,                   //Inserindo no campo corpo os dados do corpo do HTML
        perguntaId: perguntaId          //Inserindo no campo perguntaId os dados do ID do HTML
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);    // Após isso redireciona
    });
})

app.listen(8080, () => { console.log("App Rodando") }) // Escutando Servidor

