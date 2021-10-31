const User = require("../models/user.models");
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el user que corresponde al uid
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - (User does not exist in the database)'
            })
        }

        // Verificar si el user tiene estado true
        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid token - (User state === false)'
            })
        }


        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

}


module.exports = {
    validateJWT
}