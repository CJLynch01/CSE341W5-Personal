const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/', recipesController.createNewRecipe);

router.put('/:id', recipesController.editRecipe);

router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;