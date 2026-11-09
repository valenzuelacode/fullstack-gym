import {AuthSchemaValidation} from "../lib/validations/auth";

export async function loginAction(formData: FormData) {

   const ValidateAuthFields = AuthSchemaValidation.safeParse({
      email:formData.get("email"),
      password:formData.get("password")
   })
   
   if(!ValidateAuthFields.success){
      return {
         errors:ValidateAuthFields.error.flatten().fieldErrors,
      }
   }


}