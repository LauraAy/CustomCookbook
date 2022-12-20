const db = require("../models")
const Recipe = db.recipes

//Create and Save a new Recipe
exports.create = (req, res) => {
    //Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Create a Recipe
    const recipe = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
        
    }

    //Save Recipe in the database
    Recipe.create(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Recipe."
        });
    });
};

//Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: '%${title}%' } } : null;

    Recipe.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error occurred while retrieving recipes."
        });
    });
};

//Find a single Recipe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: 'Cannot find Tutorial with id=${id}.'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" +id
        });
    });

};

//Update a recipe by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({

                message: "Recipe was updated successfully."
            });
        } else {
            res.send({
                message: 'Cannot update Reciepe with id=${id}. Maybe Recipe was not found or req.body is empty!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" +id
        });
    });
};

//Delete a Recipe with the specified id:
exports.delete = (req, res) => {
    const id = req.params.id;

    Recipe.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Recipe was deleted successfully!"
            });
        } else {
            res.send({
                message: 'Cannot delete Tutorial with id=${id}. Maybe Recipe was not found!'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Recipe with id=" + id
        });
    });
};

//Delete all Recepies from the database.
exports.deleteAll = (req, res) => {
    Recipe.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({message: '${nums} Recipes were deleted successfully!'
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error occurred while removing all recipes."
        });
    });
};

//Find all Recipes with published =true
};

