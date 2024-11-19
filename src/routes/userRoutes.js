const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/view', userController.getAvailableItems);
router.post('/book', userController.bookGroceryItems);

module.exports = router;
