import * as Joi from 'joi';

//Register Validation
export const validateObject = (schema: Joi.Schema, data: any): any => {
    const res = schema.validate(data, { stripUnknown: true });
  
    if(res.error) {
      throw new Error('failed validation');
    }
  
    return res.value;
  }

