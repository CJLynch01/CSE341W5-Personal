const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('recipes').collection('categories').find();
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
    const result = await mongodb.getDb().db('recipes').collection('categories').find({ _id: userId });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createNewCategory = async (req, res) => {
  try {
    const category = {
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    };

    const response = await mongodb.getDb().db('recipes').collection('categories').insertOne(category);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Error occurred while creating category.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editCategory = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const category = {
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    };
    const response = await mongodb.getDb().db('recipes').collection('categories').replaceOne({ _id: userId }, category);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error occurred while updating category.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('recipes').collection('categories').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Error occurred while deleting category.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createNewCategory, editCategory, deleteCategory };