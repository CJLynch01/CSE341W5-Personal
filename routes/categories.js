const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');
const validation = require('../middleware/validate');

router.get('/', categoriesController.getAll);

router.get('/:id', categoriesController.getSingle);

router.post('/', validation.saveRecipe, categoriesController.createNewCategory);

router.put('/:id', validation.saveRecipe, categoriesController.editCategory);

router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;