const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');
const validation = require('../middleware/validate');

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/', validation.saveRecipe, recipesController.createNewRecipe);

router.put('/:id', validation.saveRecipe, recipesController.editRecipe);

router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;