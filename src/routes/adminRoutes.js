const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/add', adminController.addGroceryItem);
router.get('/view', adminController.viewGroceryItems);
router.put('/update/:id', adminController.updateGroceryItem);
router.delete('/delete/:id', adminController.deleteGroceryItem);

module.exports = router;
