const User = require('../models/user.models');

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


module.exports = {
    emailAlreadyRegistered
}