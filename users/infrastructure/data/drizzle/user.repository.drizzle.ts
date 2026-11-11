import { eq, lt, gte, ne } from 'drizzle-orm';

import UserRepository from "@/users/domain/user.repository";
import User from "@/users/domain/User";
import {db} from "@/db/pg/index";
import {userTable,userProfileTable} from "@/db/pg/schema";
import { UserProfile } from '@/userProfile/domain/UserProfile';

export default class UserRepositoryDrizzle implements UserRepository{

   async getById(id:number):Promise<User | undefined>{
      const user = await db.select().from(userTable)
                  .leftJoin(userProfileTable,eq(userTable.id,userProfileTable.idUser))
                  .where(eq(userTable.id,id));
      
      if(user.length === 0)
         throw new Error("Usuario no encontrado");
      let userData:User = {
         id:user[0].id,
         email:user[0].email,
         firstName:user[0].firstName,
         profile:user[0].userProfile,
      }
      return userData;
   }

   async getByEmail(email:string):Promise<User|undefined>{

      const user = await db.select().from(userTable)
                  .leftJoin(userProfileTable,eq(userTable.id,userProfileTable.idUser))
                  .where(eq(userTable.email,email));

      if(user.length === 0)
         throw new Error("Usuario no encontrado");

      let userProfile:UserProfile = {
         role:user[0].userProfile?.role,
      }
      let userData:User = {
         id:user[0].id,
         email:user[0].email,
         firstName:user[0].firstName,
         profile:userProfile
      }

      return userData;
   }

   async setUser(user:User):Promise<User>
   {
      const NewUserTransaction = await db.transaction(async (tx)=>{

         const [newUser] = await tx.insert(userTable).values({
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            password:user.password,
            address:user.address,
            createdAt:new Date(),
         }).returning()

         if(!newUser.id)
            throw new Error("Error al crear el usuario");

         const [newUserProfile] = await tx.insert(userProfileTable).values({
            idUser:newUser.id,
            role:user.profile?.role || "customer",
            plan:user.profile?.plan || "free"
         }).returning()

         if(!newUserProfile.id)
            throw new Error("Error creando el perfil del usuario")
         
         const userProfile:UserProfile = {
            role:newUserProfile.role,
            plan:newUserProfile.plan
         }
         
         const createdUser:User = {
            id:newUser.id,
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            profile:userProfile
         }

         return createdUser
      })
  
      return NewUserTransaction;
   }
   
   async updateUser(user:User):Promise<User>
   {
      throw new Error("Method not implemented.");
   }
   async deleteUser(user:User):Promise<User>
   {
      throw new Error("Method not implemented.");
   }
}