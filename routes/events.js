/*
    Event Route
    /api/events
*/

const express = require ('express');
const router = express.Router()
const {check} = require('express-validator')

const { isDate } = require('../helpers/isDate')
const {getEvents, createEvent, updateEvent, deleteEvent} = require ("../controlers/events");
const { validateFields } = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validate-jwt')

// Todas tienen que pasar por la validacion del JWT
router.use(validateJWT)

// Obtener eventos
router.get('/', getEvents)

//Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validateFields
    ],
    createEvent)

//Actualizar un nuevo evento
router.put('/:id', updateEvent)

//Borrar un nuevo evento
router.delete('/:id', deleteEvent)


module.exports = router
    