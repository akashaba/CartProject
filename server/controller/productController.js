const Product = require('../model/product');

exports.save = (req, res, next) => {
    const addedProd = new Product(null, req.body.name, req.body.price, req.body.image, req.body.stock).save();
    res.status(201).json(addedProd);
}

exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.deleteById = (req, res, next) => {
    res.json(Product.deleteById(req.params.productId));
}
exports.getProdById = (req, res, next) => {
    res.json(Product.getProdById(req.params.id));
}

// exports.edit = (req, res) => {
//     const editedProd = new Product(req.params.id, req.body.name, req.body.price, req.body.image, req.body.stock).edit();
//     res.json(editedProd);
// }
exports.edit = (req, res) => {
    const name= req.params.name;
  const { id, price, image, stock } = req.body;
  const editedProd = new Product(id, name, price, image, stock).edit();
    res.json(editedProd);
  };
  
exports.updateStock = (req, res) => {
    const updatedStock = new Product(req.params.name, req.body.stock).updateStock();
    res.json(updatedStock);
}