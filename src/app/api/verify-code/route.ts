import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";



export async function POST(request:Request) {
    await dbConnect()

    try {

        const {username , code } = await request.json()

        const decodedUsername =  decodeURIComponent(username)

        const user = await UserModel.findOne({
            username: decodedUsername
        })

        if(!user) {
            return Response.json({
                success: false,
                message :"User not found!"
            }, {status: 500})
        }

        const isVerifyCode = user.verifyCode === code
        const isVerfyCodeExpire = new Date( user.verifyCodeExpairy) > new Date()

        if(!(isVerifyCode)) {
            return Response.json({
                success: false,
                message :"Verification code is incrrect, Plaese enter correct code!"
            }, {status: 500})
        }else if (!isVerfyCodeExpire) {
            return Response.json({
                success: false,
                message :"Verification code is expired, please signup again to get new code"
            }, {status: 500})
        }

        

        user.isVerify = true
        await user.save()

        return Response.json({
            success: true,
            message :"account verified successfully"
        }, {status: 200})
        
    } catch (error) {
        console.log('error checking verifying user code', error)

        return Response.json({
            success: false,
            message: "Error verifying user"
        }, {status: 500})
    }
}