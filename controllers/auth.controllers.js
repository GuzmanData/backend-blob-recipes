const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.models');
const { generateJwt } = require('../helpers/generate-jwt');



const login = async (req, res = response) => {


    try {
        const { email, password } = req.body;

        // Verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email or password are not correct- (email)'
            });
        }


        // Si el usuario está activo
        if (!user.state) {
            return res.status(400).json({
                ok: false,
                msg: 'Email or password are not correct - (state-false)'
            });
        }


        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email or password are not correct - (password)'
            });
        }

        const token = await generateJwt(user.id);

        res.json({
            ok: true,
            msg: 'successful login',
            user: {
                uid: user.id,
                name: user.name,
                token
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }

}


const register = async (req, res = response) => {

    try {

        const { email, password, name } = req.body;

        let user = new User({ email, name });

        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        const token = await generateJwt(user.id);

        res.status(201).json({
            ok: true,
            msg: 'successful register',
            user: {
                uid: user.id,
                name: user.name,
                token
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }

}

const renewToken = async (req, res = response) => {

    const user = req.user;
    try {

        // Generar el JWT
        const tokenNew = await generateJwt(user.id);

        res.json({
            ok: true,
            msg: 'Valid token',
            user: {
                uid: user.id,
                name: user.name,
                token: tokenNew
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk to the database administrator'
        });
    }
};

module.exports = {
    login,
    register,
    renewToken

}
