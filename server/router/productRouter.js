const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();


router.post('/', productController.save);
router.get('/', productController.getAll);
router.delete('/:productId', productController.deleteById);
router.put('/:name', productController.edit)
router.get('/:id', productController.getProdById);


module.exports = router;