const express = require ('express');
const router = express.Router()
const {check} = require('express-validator')

const {createUser, userLogin, revalidateToken} = require ("../controlers/auth");
const { validateFields } = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validate-jwt')

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe ser de 6 caracteres').isLength({min:6}),
        validateFields
    ],
    createUser
)

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe ser de 6 caracteres').isLength({min:6}),
        validateFields
    ], userLogin)

router.get('/renew', validateJWT, revalidateToken)

module.exports = router