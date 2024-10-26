const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('recipes').collection('categories').find();
  result.toArray().then((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('recipes').collection('categories').find({ _id: userId });
  result.toArray().then((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createNewCategory = async (req, res) => {
  const category = {
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
  };

  const response = await mongodb.getDb().db('recipes').collection('categories').insertOne(category);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Error occured while creating contact.')
  }
};

const editCategory = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const category = {
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
  };
  const response = await mongodb.getDb().db('recipes').collection('categories').replaceOne({ _id: userId }, category);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occured while creating contact.')
  }
};

const deleteCategory = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('recipes').collection('categories').deleteOne({ _id: userId }, true);

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occured while creating contact.')
  }
};

module.exports = { getAll, getSingle, createNewCategory, editCategory, deleteCategory };