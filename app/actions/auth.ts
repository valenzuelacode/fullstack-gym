'use server'
import {AuthSchemaValidation,FormState} from "@/lib/validators/auth";
import * as encripted from '@/lib/bcrypt/encripted';
import { db } from "@/db/pg";
import * as dbSchema from "@/db/pg/schema";

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {

   console.log(formData)
   const ValidateAuthFields = AuthSchemaValidation.safeParse({
      email:formData.get("email"),
      password:formData.get("password")
   })

   if(!ValidateAuthFields.success){
      return {
         errors:ValidateAuthFields.error.flatten().fieldErrors,
      }
   }else{
   
      console.warn('datos formulario: ', formData)
      const hashPassword = await encripted.hashPassword(formData.get('password') as string);
      console.log('hashed password', hashPassword)
      const user = {
         email:formData.get('email'),
         passwod:hashPassword
      }

      return {
         message: "Login correcto",
      }
   }
}
