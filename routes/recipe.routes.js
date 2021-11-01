const { Router } = require('express');
const { check } = require('express-validator');
const { createRecipe, getRecipes, getRecipeById } = require('../controllers/recipe.controllers');
const { recipeExistsById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwr');
const { isAdminRole } = require('../middlewares/validate-roles');
const router = Router();

router.get('/', getRecipes);


router.get('/:id',
    [
        check('id', 'not a valid mongo id').isMongoId(),
        validateFields,
        check('id').custom(recipeExistsById),
        validateFields
    ],

    getRecipeById

)

router.post('/create',
    [
        validateJWT,
        isAdminRole,
        check('title', 'The title is required').notEmpty(),
        check('preparation', 'The preparation does not have a correct structure').notEmpty(),
        check('description', 'The description is required').notEmpty(),
        check('ingredients', 'The ingredients is required').notEmpty(),
        validateFields,
    ],
    createRecipe
);




module.exports = router