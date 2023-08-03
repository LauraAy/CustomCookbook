const db = require("../models");
const Creator = db.creator;
const Recipe = db.recipe;
const CreatorRecipe = db.creator_recipe;

//Add Creator to Region
exports.createCreatorRecipe = (req, res) => {

  const creatorRecipe = {
    creatorId: req.body.creatorId,
    recipeId: req.body.recipeId
  };

  CreatorRecipe.create(creatorRecipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the creator to region."
      });
    });
};

//Find all creators with recipes
exports.findCreatorRecipes = (req, res) => {
  Creator.findAll ({
       include: [ 
       {
        model: Recipe,
        as: "recipe",
        attributes: ['title']
      }],
})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the Regions."
        });
      });
  };


  //Find a single creator with recipes
exports.findOneCreatorRecipe = (req, res) => {
  const id = req.params.id;

  Creator.findByPk(id, {
   include: [ 
      {
       model: Recipe,
       as: "recipe",
       attributes: ['title']
     }],
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving the Region."
    });
  });
};
    
//Find all Recipes with Creators
exports.findRecipeCreators= (req, res) => {
  
    Recipe.findAll({ include: [
      {
        model: Creator,
        as: "creator"
      }
    ] })
    .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find recipe.`
      });
    }
    })
    .catch(err => {
    res.status(500).send({
      message: "Error retrieving Creator with id=" + id
    });
    });
    };

    //Find one Recipe with Creators
        exports.findOneRecipeCreator= (req, res) => {
          const id = req.params.id;
          
          Recipe.findByPk(id, { include: [
            {
              model: Creator,
              as: "creator"
            }
          ] })
          .then(data => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find Creator with id=${id}.`
            });
          }
          })
          .catch(err => {
          res.status(500).send({
            message: "Error retrieving Creator with id=" + id
          });
        });
      };
    
    //remove creator from recipe
    exports.removeCreator = (req, res) => {
    const recipeId = req.params.recipeId;
    const creatorId = req.params.creatorId 

    CreatorRecipe.destroy({
      where: {creatorId: creatorId, recipeId: recipeId}
    })
    .then(nums => {
      res.send({ message: `${nums} creator_recipes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing region_recipes."
      });
    });  
}