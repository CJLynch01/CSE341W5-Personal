const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createNewRecipe);

router.put('/:id', contactsController.editRecipe);

router.delete('/:id', contactsController.deleteRecipe);

module.exports = router;