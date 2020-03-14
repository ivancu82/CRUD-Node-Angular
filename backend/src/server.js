const express = require('express');
const app = express();

var morgan = require('morgan');
app.use(morgan('tiny'));

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use("/productos", require('./routes/productos.js'));

app.listen(8080, function () {
    console.log("Servidor escuchando en el puerto 8080");
});