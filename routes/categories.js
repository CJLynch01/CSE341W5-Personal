const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

router.get('/', categoriesController.getAll);

router.get('/:id', categoriesController.getSingle);

router.post('/', categoriesController.createNewCategory);

router.put('/:id', categoriesController.editCategory);

router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;