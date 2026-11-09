import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12

export async function hashPassword(password:string){
    return bcrypt.hash(password,SALT_ROUNDS)
}

export async function compare(password:string,encriptedPassword:string){

    return bcrypt.compare(password,encriptedPassword);

}