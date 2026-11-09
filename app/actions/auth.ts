'use server'
import {cookies} from 'next/headers'
import {AuthSchemaValidation,FormState} from "@/lib/validators/auth";
import UsuarioUseCases from "@/users/application/user.useases";
import UserRepositoryDrizzle from "@/users/infrastructure/data/drizzle/user.repository.drizzle";
import User from "@/users/domain/User";
const usuarioUseCases = new UsuarioUseCases(new UserRepositoryDrizzle());

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {

   const ValidateAuthFields = AuthSchemaValidation.safeParse({
      email:formData.get("email"),
      password:formData.get("password")
   })

   if(!ValidateAuthFields.success){
      return {
         errors:ValidateAuthFields.error.flatten().fieldErrors,
      }
   }else{
      try{
         const user:User = {
            email:formData.get("email") as string,
            password:formData.get("password") as string,
         }
         let usuario = await usuarioUseCases.login(user.email as string,user.password as string);
         if(!usuario)
               return {message:'Error al iniciar sesión'}
         const cookie = await cookies()
         cookie.set({
            name:'user',
            value:JSON.stringify(usuario),
            httpOnly:true,
            secure:true,
            maxAge:60 * 60 * 9
         })

      }catch(error){
         console.error('Error al iniciar sesión: ', error)
         if(error instanceof Error)
            return {message:error.message}
      }
     
   }
}
