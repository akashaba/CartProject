const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/', userController.save);
router.get('/', userController.getAll);
router.post('/login', userController.find);


module.exports = router;