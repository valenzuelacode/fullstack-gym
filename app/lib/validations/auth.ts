import * as z from 'zod';

export const AuthSchemaValidation = z.object({
   email:z.email()
      .trim(),
   password:z.string()
      .trim()
      .min(6,{error:"El password debe tener al menos 6 caracteres"})
})

export type AuthTypeValidation = | {
   errors?:{   
      email?:string,
      password?:string,
   }
   message?:string
} | undefined