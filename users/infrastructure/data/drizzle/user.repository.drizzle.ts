import { eq, lt, gte, ne } from 'drizzle-orm';

import UserRepository from "@/users/domain/user.repository";
import User from "@/users/domain/User";
import {db} from "@/db/pg/index";
import {userTable,userProfileTable} from "@/db/pg/schema";

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
      const user = await db.select().from(userTable).where(eq(userTable.email,email));

      if(user.length === 0)
         throw new Error("Usuario no encontrado");
      
      let userData:User = {
         id:user[0].id,
         email:user[0].email,
         firstName:user[0].firstName,
         role:user[0].role,
      }

      return userData;
   }

   async setUser(user:User):Promise<User>
   {
      const [newUser] = await db.insert(userTable).values({
         email:user.email,
         firstName:"pruebas",
         lastName:"pruebas",
         password:user.password,
         createdAt:new Date(),
      }).returning()
      if(!newUser.id)
         throw new Error("Error al crear el usuario");
      user.id = newUser.id;
      return user;
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