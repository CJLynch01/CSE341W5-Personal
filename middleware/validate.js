const validator = require('../helpers/validate');

const saveRecipe = (req, res, next) => {
  const validationRule = {
    recipeName: 'required|string',
    recipeDescription: 'required|string',
    recipePrepTime: 'required|string',
    recipeCookTime: 'required|string',
    recipeServingSize: 'required|string',
    recipeIngredients: 'required|string',
    recipeInstructions: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveRecipe
};