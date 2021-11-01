const { response } = require('express');
const Recipe = require('../models/recipe.models');

const createRecipe = async (req, res = response) => {

    const { title, img, preparation, description, ingredients } = req.body;

    const data = { title, img, preparation, description, ingredients, creationDate: new Date().toDateString() }


    const recipeDb = await Recipe.findOne({ title });

    if (recipeDb) {
        return res.status(400).json({
            ok: false,
            msg: `The recipe with the title ${title} already exists in the database`
        });
    }

    const recipe = new Recipe(data);

    await recipe.save();


    try {

        res.json({
            ok: true,
            msg: 'Successfully created recipe',
            recipe
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }


}


const getRecipes = async (req, res = response) => {

    try {

        const { limit = 5, from = 0 } = req.query;
        const [total, recipes] = await Promise.all([
            Recipe.countDocuments(),
            Recipe.find()
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        res.json({
            ok: true,
            total,
            recipes
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }


}


const getRecipeById = async (req, res = response) => {


    try {

        const { id } = req.params;
        const recipe = await Recipe.findById(id)

        res.json({
            ok: true,
            recipe
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }


}

module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById
}