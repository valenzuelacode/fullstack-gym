import usuarioUseCases from "@/users/application/user.useases";
import UserRepositoryDrizzle from "@/users/infrastructure/data/drizzle/user.repository.drizzle";
import * as userValidator from '@/lib/validators/UserValidator'
import { UserProfile } from "@/userProfile/domain/UserProfile";
import { User } from "@/users/domain/User";

const UserUseCases = new usuarioUseCases(new UserRepositoryDrizzle());


export async function GET(request:Request)
{

    console.log("request: ", request);

    return Response.json(request,{status:200})

}


export async function POST(request:Request)
{
    const body = await request.json()
    const {email,password,firstName,lastName,address,phoneNumber,role,plan} = body

    const ValidateUserFields = userValidator.CreateUserValidator.safeParse({
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber
    })

    const ValidateUserProfileFields = userValidator.CreateUserProfileValidator.safeParse({
        role:role || "customer",
        plan: plan || "free"
    })

    if(!ValidateUserFields.success || !ValidateUserProfileFields.success)
        return Response.json({
            errors:[ValidateUserFields.error?.flatten().fieldErrors, ValidateUserProfileFields.error?.flatten().fieldErrors]
        },{status:400})

    const UserProfile:UserProfile = {
        role,
        plan
    }

    const User:User = {
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber,
        profile:UserProfile
    }

    try{
        const ResUser = await UserUseCases.createUser(User);
        return Response.json({error:false,user:ResUser},{status:200})
    }catch(error){
        console.log("error creando user: ",error)
        if(error instanceof Error)
            return Response.json({error:true,message:error.message},{status:400})
    }

}