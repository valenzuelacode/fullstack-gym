import * as z from 'zod';

export const AuthSchemaValidation = z.object({
   email:z.email({error:"El email debe incluir un @example.com"})
      .min(5,{error:"El email debe tener mínimo 5 caracteres"})
      .trim(),
   password:z.string()
      .trim()
      .min(6,{error:"El password debe tener al menos 6 caracteres"})
})

export type FormState = {
   errors?:{
      email?:string[],
      password?:string[],
   }
   message?:string
} | undefined
