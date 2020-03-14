var express = require('express');
var router = express.Router();

var controller = require('../controllers/productos.js');

var Productos = require('../models/productos.js');

router.param('id', controller.loadProducto);

router.get('/', controller.getProductos);
router.get('/:id', controller.getProducto);
router.post('/', controller.checkProducto, controller.createProducto);
router.put('/:id', controller.checkProducto, controller.updateProducto);
router.delete('/:id', controller.deleteProducto);

module.exports = router;