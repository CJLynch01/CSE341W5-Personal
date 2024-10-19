const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('recipes').collection('recipes').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('recipes').collection('recipes').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewRecipe = async (req, res) => {
  const recipe = {
    recipeName: req.body.recipeName,
    recipeType: req.body.recipeType,
    recipeServingSize: req.body.recipeServingSize,
    recipeMeatType: req.body.recipeMeatType,
    recipeIngredients: req.body.recipeIngredients,
    recipeCookTime: req.body.recipeCookTime,
    recipeCookInstructions: req.body.recipeCookInstructions
  };

  const response = await mongodb.getDb().db('recipes').collection('recipes').insertOne(recipe);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occured while creating contact.')
  }
};

const editRecipe = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const recipe = {
    recipeName: req.body.recipeName,
    recipeType: req.body.recipeType,
    recipeServingSize: req.body.recipeServingSize,
    recipeMeatType: req.body.recipeMeatType,
    recipeIngredients: req.body.recipeIngredients,
    recipeCookTime: req.body.recipeCookTime,
    recipeCookInstructions: req.body.recipeCookInstructions
  };
  const response = await mongodb.getDb().db('recipes').collection('recipes').replaceOne({ _id: userId }, recipe);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occured while creating contact.')
  }
};

const deleteRecipe = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('recipes').collection('recipes').deleteOne({ _id: userId }, true);

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occured while creating contact.')
  }
};

module.exports = { getAll, getSingle, createNewRecipe, editRecipe, deleteRecipe };