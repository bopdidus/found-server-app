const Joi = require('joi');

//Register Validation
const registrationValidation = (data) =>{

    const schemaUser = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3),
        email:Joi.string().email().min(7).max(50).required(),
        phoneNumber: Joi.number().required()
    };

    return Joi.validate(data, schemaUser)

}

module.exports.SchemaUser = registrationValidation;