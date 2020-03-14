var Productos = require('../models/productos.js');

exports.getProductos = function (req, res) {
    Productos.getAll()
        .then(function (productos) {
            var query = req.query.query;
            if (query) {
                productos = productos.filter(p => p.nombre.includes(query) || p.descripcion.includes(query));
            }
            res.json(productos);
        })
        .catch(function () {
            res.sendStatus(500);
        });
};

exports.getProducto = function (req, res) {
    res.send(req.producto);
};

exports.createProducto = function (req, res) {
    var producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad
    };

    Productos.create(producto)
        .then(function (producto) {
            var location = '/productos/' + producto.id;
            res.setHeader('Location', location);
            res.status(201).json(producto);
        })
        .catch(function () {
            res.sendStatus(500);
        });
};

exports.updateProducto= function (req, res) {
    var id = req.params.id;
    var producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad
    };

    Productos.update(id, producto)
        .then(function (producto) {
            res.status(204).json(producto);
        })
        .catch(function () {
            res.sendStatus(500);
        });
};

exports.deleteProducto = function (req, res) {
    var id = req.params.id;
    Productos.delete(id)
        .then(function (producto) {
            res.status(200).json(producto);
        })
        .catch(function () {
            res.sendStatus(500);
        });
};

exports.loadProducto = function (req, res, next, id){
    Productos.getById(id)
        .then(function (producto) {
            req.producto = producto;
            next();
        })
        .catch(function () {
            res.status(404).send("Producto Not Found");
        });
};

exports.checkProducto = function (req, res, next) {
    var data = req.body;
    if ('nombre' in data && 'descripcion' in data && 'cantidad' in data) {
        next();
    } else {
        res.sendStatus(400);
    }
};