const { Schema , model } = require('mongoose');

const RecipeSchema = Schema({

    title: {
        type: String,
        required: [true, 'title is required']
    },
    img: {
        type: String,
        required: [false, 'image is required']
    },
    preparation: {
        type: String,
        required: [true, 'preparation is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    ingredients: {
        type: String,
        required: [true, 'ingredients is required']
    },
    creationDate: {
        type: String,
        required: [true, 'creationDate is required'], 
    },


});


RecipeSchema.methods.toJSON = function() {
    const { __v, password, _id, ...recipe  } = this.toObject();
    recipe.uid = _id;
    return recipe;
}

module.exports = model( 'Recipe', RecipeSchema );

