const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

//Valida que el WorkSpace contenga los atibutos y valores correspondientes, y no contenga otras estrucutras:
const validateWorkSpace = [
    // check('card.checksList.*.tasks') :   Valida el campo tasks de cada objeto dentro de checksList.
   
    check("WorkSpace").exists().bail().isObject().custom( (WorkSpace, {req}) => {
        
            const allowedProperties = ['name', 'sections'];
            const unknownProperties = Object.keys(WorkSpace).filter(key => !allowedProperties.includes(key));
            
            if (unknownProperties.length > 0) {
                throw new Error(`Propiedades desconocidos en WorkSpace : ${unknownProperties.join(', ')}`);
            }
            
            return true;
    }), 

    check("WorkSpace.name").exists().isString().trim().notEmpty().escape(),
    check("WorkSpace.sections").exists().bail().isArray(),
    check("WorkSpace.sections.*").bail().isObject(), //Todo los elementos del array sean objetos
    check("WorkSpace.sections.*.position").isInt(),
    check("WorkSpace.sections.*.title").isString().trim().notEmpty().escape(),

    check('WorkSpace.sections.*.cards').bail().isArray(),
    check('WorkSpace.sections.*.cards.*')
        .bail() //para detener la cadena de validación si la validación actual falla
        .isObject()
        .custom((card, { req }) => {
            //validacion personalizada pasando el card del body de la solicitud, desterminia si tiene card esas propiedades claves
            const allowedProperties = ['title', 'note', 'checksList',"position"];
            const unknownProperties = Object.keys(card).filter(key => !allowedProperties.includes(key));
            
            if (unknownProperties.length > 0) {
                throw new Error(`Atributos desconocidos en card: ${unknownProperties.join(', ')}`);
            }
            
            return true;
        }),
    check('WorkSpace.sections.*.cards.*.title')
        .isString()
        .escape(),//TODO: crear validaccion exclusiva para la sanitización de datos / Asegurarlo en el Front
    check('WorkSpace.sections.*.cards.*.note').isString(),
    check('WorkSpace.sections.*.cards.*.checksList')
        .isArray()
        .custom((checksList, { req }) => {
            for (const item of checksList) {

                if (typeof item !== 'object') {
                    throw new Error(`El elemento en checksList no es un objeto`);
                }
                
                const unknownProperties = Object.keys(item).filter(key => !['title', 'tasks'].includes(key));
                if (unknownProperties.length > 0) {
                    throw new Error(`Atributos desconocidos en checksList item: ${unknownProperties.join(', ')}`);
                }
            }
            
            return true;
        }),
    check('WorkSpace.sections.*.cards.*.checksList.*.title')
        .isString()
        .escape(),
    check('WorkSpace.sections.*.cards.*.checksList.*.tasks')
        .isArray()
        .custom((tasks, { req }) => {
            for (const task of tasks) {
                if (typeof task !== 'object') {
                    throw new Error(`El elemento en tasks no es un objeto`);
                }

                const unknownProperties = Object.keys(task).filter(key => !['task', 'check'].includes(key));
                if (unknownProperties.length > 0) {
                    throw new Error(`Atributos desconocidos en tasks item: ${unknownProperties.join(', ')}`);
                }
            }
            
            return true;
        }),
    check('WorkSpace.sections.*.cards.*.checksList.*.tasks.*.task').isString().escape(),
    check('WorkSpace.sections.*.cards.*.checksList.*.tasks.*.check').isBoolean(),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
    
]






//-------------------------------------------------------------------------------------------------------

//Valida que el card contenga los atibutos y valores correspondientes, y no contenga otras estrucutras:
const validateCard = [ 
    
    check('posicion').optional().isInt(),// Son ignorados por el controlador para evitar posibles conflictos => son opcinales
    check('id').optional().isInt(),// Son ignorados por el controlador => son opcinales
    
    check('card')
        .bail() //para detener la cadena de validación si la validación actual falla
        .isObject()
        .custom((card, { req }) => {
            //validacion personalizada pasando el card del body de la solicitud
            const allowedCardKeys = ['title', 'note', 'checksList'];
            const unknownKeys = Object.keys(card).filter(key => !allowedCardKeys.includes(key));
            
            if (unknownKeys.length > 0) {
                throw new Error(`Atributos desconocidos en card: ${unknownKeys.join(', ')}`);
            }
            
            return true;
        }),
    check('card.title')
        .isString()
        .escape(),//TODO: crear validaccion exclusiva para la sanitización de datos / Asegurarlo en el Front
    check('card.note').isString(),
    check('card.checksList')
        .isArray()
        .custom((checksList, { req }) => {
            for (const item of checksList) {

                if (typeof item !== 'object') {
                    throw new Error(`El elemento en checksList no es un objeto`);
                }
                
                const unknownKeys = Object.keys(item).filter(key => !['title', 'tasks'].includes(key));
                if (unknownKeys.length > 0) {
                    throw new Error(`Atributos desconocidos en checksList item: ${unknownKeys.join(', ')}`);
                }
            }
            
            return true;
        }),
    check('card.checksList.*.title')
        .isString()
        .escape(),
    check('card.checksList.*.tasks')
        .isArray()
        .custom((tasks, { req }) => {
            for (const task of tasks) {
                if (typeof task !== 'object') {
                    throw new Error(`El elemento en tasks no es un objeto`);
                }

                const unknownKeys = Object.keys(task).filter(key => !['task', 'check'].includes(key));
                if (unknownKeys.length > 0) {
                    throw new Error(`Atributos desconocidos en tasks item: ${unknownKeys.join(', ')}`);
                }
            }
            
            return true;
        }),
    check('card.checksList.*.tasks.*.task').isString().escape(),
    check('card.checksList.*.tasks.*.check').isBoolean(),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
    
]


module.exports = { validateCard, validateWorkSpace }