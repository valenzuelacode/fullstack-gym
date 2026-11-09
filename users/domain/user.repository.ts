import User from "./User"
export default interface UserRepository{

    getById(id:number):Promise<User | undefined>
    login(email:string,password:string):Promise<User|undefined>
    setUser(user:User):Promise<User>
    updateUser(user:User):Promise<User>
    deleteUser(user:User):Promise<User>

}