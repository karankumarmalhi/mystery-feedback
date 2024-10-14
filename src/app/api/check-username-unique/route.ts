import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import {z} from 'zod'
import { usernameValidation } from '@/schemas/signUpSchema'


const UserNameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request: Request) {
    await dbConnect()
    
    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username : searchParams.get('username')
        } 

       
        //validate with zod.
        const result = UserNameQuerySchema.safeParse(queryParam)

        // console.log(result.success)

        if(!result.success) {
            const usernameError = result.error.format().username?._errors || []

            return Response.json({
                success: false,
                message : usernameError.length>0 ? usernameError.join(', ') : "Invalid query perameter"
            }, {status: 400})
        }
        

        const {username} = result.data
        const existingVerifiedUser = await UserModel.findOne({username, isVerify: true})

        if(existingVerifiedUser) {
            return Response.json({
                success: false,
                message : "Username is already taken "
            }, {status: 400})
        }

        return Response.json({
            success: true,
            message : "Username is unique"
        }, {status: 400})

        
    } catch (error) {
        console.log('error checking username', error)

        return Response.json({
            success: false,
            message: "Error checking username"
        }, {status: 500})
    }
}