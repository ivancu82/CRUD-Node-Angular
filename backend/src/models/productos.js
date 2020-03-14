var productos = [
    { nombre: 'SM-M205FZBWPHE',
    descripcion: 'Samsung Galaxy M20 4/64GB Ocean Blue Libre',
    cantidad: 50,
    id: 1 },
    { nombre: 'SM-A505FZKSPHE',
    descripcion: 'Samsung Galaxy A50 4/128GB Negro Libre',
    cantidad: 10,
    id: 2 },
    { nombre: 'SM-M205FDAWPHE',
    descripcion: 'Samsung Galaxy M20 4/64GB Charcoal Black Libre',
    cantidad: 10,
    id: 3 },
    { nombre: 'SM-A705FZKUPHE',
    descripcion: 'Samsung Galaxy A70 6/128GB Negro Libre',
    cantidad: 10,
    id: 4 },
    { nombre: 'SM-A715FZBUPHE',
    descripcion: 'Samsung Galaxy A71 6/128GB Prism Crush Blue',
    cantidad: 5,
    id: 5 }   
];
var lastId = 5;

exports.getAll = function () {
    return Promise.resolve(productos);
};

exports.getById = function (id) {
    return new Promise(function (resolve, reject) {
        var producto = productos.find(p => p.id == id);
        if (producto) {
            resolve(producto);
        } else {
            reject();
        }
    });
};

exports.create = function (producto) {
    var id = ++lastId;
    producto.id = id;
    productos.push(producto);
    return Promise.resolve(producto);
};

exports.update = function (id, producto) {
    return new Promise(function (resolve, reject) {
        var index = productos.findIndex(p => p.id == id);
        if (index != -1) {
            producto.id = parseInt(id);
            productos[index] = producto;
            resolve(producto);
        } else {
            reject();
        }
    });
};

exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        var index = productos.findIndex(p => p.id == id);
        if (index != -1) {
            var producto = productos.splice(index, 1);
            resolve(producto[0]);
        } else {
            reject();
        }
    });
};