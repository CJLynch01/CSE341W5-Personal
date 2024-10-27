const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('recipes').collection('recipes').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('recipes').collection('recipes').find({ _id: userId });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createNewRecipe = async (req, res) => {
  try {
    const recipe = {
      recipeName: req.body.recipeName,
      recipeDescription: req.body.recipeDescription,
      recipePrepTime: req.body.recipePrepTime,
      recipeCookTime: req.body.recipeCookTime,
      recipeServingSize: req.body.recipeServingSize,
      recipeIngredients: req.body.recipeIngredients,
      recipeInstructions: req.body.recipeInstructions
    };

    const response = await mongodb.getDb().db('recipes').collection('recipes').insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Error occurred while creating recipe.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editRecipe = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const recipe = {
      recipeName: req.body.recipeName,
      recipeDescription: req.body.recipeDescription,
      recipePrepTime: req.body.recipePrepTime,
      recipeCookTime: req.body.recipeCookTime,
      recipeServingSize: req.body.recipeServingSize,
      recipeIngredients: req.body.recipeIngredients,
      recipeInstructions: req.body.recipeInstructions
    };
    const response = await mongodb.getDb().db('recipes').collection('recipes').replaceOne({ _id: userId }, recipe);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error occurred while updating recipe.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('recipes').collection('recipes').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error occurred while deleting recipe.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createNewRecipe, editRecipe, deleteRecipe };