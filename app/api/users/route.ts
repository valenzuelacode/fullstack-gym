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

    // return Response.json({error:"false",user:User},{status:200})

    const ResUser = await UserUseCases.createUser(User);
    // const user = await UserUseCases.getUserById(2);

    return Response.json({user:ResUser},{status:200})
}