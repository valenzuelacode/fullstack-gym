import User from "../domain/User";
import UserRepository from "../domain/user.repository";
import * as encripted from '@/lib/bcrypt/encripted';
export default class UserUseCases{

   constructor(private userRepository: UserRepository){}

   async getUserById(id:number):Promise<User | undefined>{
      return await this.userRepository.getById(id);
   }
   async getUserByEmail(email:string):Promise<User | undefined>{
      return await this.userRepository.getByEmail(email);
   }
   async login(email:string,password:string):Promise<User | undefined>{
      const user = await this.userRepository.getByEmail(email);
      if(!user)
         throw new Error("Usuario y/o contraseña incorrectos");
      
      const isPasswordValid = await encripted.comparePassword(password,user.password as string);
      
      if(!isPasswordValid)
         throw new Error("Usuario y/o contraseña incorrectos");
      return user;
   }
   async createUser(user:User):Promise<User>{
      const hashPassword = await encripted.hashPassword(user.password as string);
      user.password = hashPassword;
      return await this.userRepository.setUser(user);
   }
}