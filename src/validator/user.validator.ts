import {z} from 'zod'
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../exception/validatorerror';

export const userSchema = z.object({
    lastname: z.string().min(2, " Lastname must be at least 2 characters"),
    firstname: z.string().min(3, "Firstname must be at least 3 characters"),
    birthdate: z.string().date(),
    password: z.string().length(10, "Password must contains 10 characters"),
    email : z.string().email().trim().min(1)
})

export const loginSchema = z.object({
    password: z.string().length(10),
    email : z.string().email().trim().min(1)
})

/*
export const RegisterValidator = (registerData, next:Function): Promise<any>=>{
    try {
        const valid = userSchema.parse(registerData);
        return next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new ValidationError(error.issues);
          } else {
            console.error("Unexpected error: ", error);
          }
    }
}*/

/*
export const LoginValidator = (registerData, next:Function)=>{
    try {
        const valid = loginSchema.parse(registerData);
       return next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            for (const issue of error.issues) {
              console.error("Validation failed: ", issue.message);
            }
          } else {
            console.error("Unexpected error: ", error);
          }
    }
}*/

