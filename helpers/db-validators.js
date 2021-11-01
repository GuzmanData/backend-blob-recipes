const User = require('../models/user.models');
const Recipe = require('../models/recipe.models');

/**
 * Devuelve una excepción si el email ya se encuentra registrado para un usuario
 * @param {*} email email a validar
 */
const emailAlreadyRegistered = async (email = '') => {



    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`the ${email} email is already registered in the database`);
    }
}


const recipeExistsById = async( id ) => {

    const recipe = await Recipe.findById(id);
    if ( !recipe ) {
        throw new Error(`There is no recipe for the id ${ id }`);
    }
}


module.exports = {
    emailAlreadyRegistered,
    recipeExistsById
}