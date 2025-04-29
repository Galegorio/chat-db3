const express = require('express');

const http = require('http');

const socketIO = require('socket.io');

const ejs = require('ejs');

const path = require('path');

const app = express();

const server = http.createServer(app);

const io = socketIO(server)


app.use(express.static(path.join(__dirname, 'public')));

app.set('view', path.join(__dirname, 'public'));

app.engine('html', ejs.renderFile);

app.use('/', (req, res)=>{
    res.render('index.html')
});

// ##### LOGICA SOCKET.IO - ENVIO E PROPAGAÇÃO DE MENSAGEM #####


// ARRAY que simula o banco de dados
let messages = [];


// ESTRUTURA DE CONEXÃO DE DO SOCKET.IO 
io.on('connection', socket=>{

    // TESTE DE CONEXÂO
    console.log('NOVO USUARIO CONECTADO: ' + socket.id);

    //Recupera e mantém(exibe) as mensagens entre o front e o back:
    socket.emit('previousMessage', messages);

    //Logica de chat quando a mensagem é enviada:
    socket.on('sendMessage', data=>{

        //Adiciona no final do array de mensagens:
        messages.push(data);

        socket.broadcast.emit('receivedMessage', data);

    });

});


server.listen(3000, ()=>{
    console.log('Whystzap rodando - http://localhost:3000');


});

const favelados_volei_real_cria_rock_and = 6 //Vitor e Kauan valem por 2