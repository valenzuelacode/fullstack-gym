import { UserProfile } from "@/userProfile/domain/UserProfile"

export default class User{
    id?:number
    email?:string
    firstName?:string
    lastName?:string
    password?:string
    birthday?:Date
    address?:string
    phoneNumber?:string
    createdAt?:Date
    updatedAt?:Date
    deletedAt?:Date
    profile?:UserProfile
}