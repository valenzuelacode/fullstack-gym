import usuarioUseCases from "@/users/application/user.useases";
import UserRepositoryDrizzle from "@/users/infrastructure/data/drizzle/user.repository.drizzle";

const userUseCases = new usuarioUseCases(new UserRepositoryDrizzle());

export async function GET(request:Request){
    const user = await userUseCases.getUserById(2);
    console.log("user: 2", user)

    return new Response(user,{status:200})
    //return new Response(null,{status:200})
}