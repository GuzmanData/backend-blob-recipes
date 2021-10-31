const { Router } = require('express');
const { check } = require('express-validator');
const { login, register, renewToken } = require('../controllers/auth.controllers');
const { emailAlreadyRegistered } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwr');
const router = Router();



router.post('/login',
    [
        check('email', 'The email is required').not().isEmpty(),
        check('email', 'The email does not have a correct structure').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 }),
        validateFields,
    ],
    login);


router.post('/register',
    [
        check('email', 'The email is required').not().isEmpty(),
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email does not have a correct structure').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 }),
        validateFields,
        check('email').custom(emailAlreadyRegistered),
        validateFields,

    ],
    register)

router.post("/renew-token",
    [
        validateJWT,
        validateFields,
    ],
    renewToken

)


module.exports = router;