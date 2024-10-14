
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from 'bcryptjs'
import { sendVerifactoinEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request : Request) {
    await dbConnect()
    try {
        const {username , email, password } = await request.json()

        const existingIUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerify: true
        })

        if(existingIUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username already exists!"
            }, {status:400})
        }

       const existingUserByEmail = await UserModel.findOne({email})

       const verifyCode = Math.floor(100000 + 90000 * Math.random()).toString()

       if(existingUserByEmail) {
            if(existingUserByEmail.isVerify){
            return Response.json({
            success: false,
            message: "User already exists!"
            }, {status:400})
        }else {
                const hashedPassword = await bcrypt.hash(password, 10)

                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpairy = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
       }else {
        const hashedPassword = await bcrypt.hash(password, 10)

        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)

        const newUser = await new UserModel({
            username,
            email,
            password:hashedPassword,
            verifyCode, 
            verifyCodeExpairy:expiryDate ,
            isVerify :false,
            isAcceptable : true,
            massages : [],
        })

        await newUser.save()
       }


        // Sendd verification email 
        const emailResponse = await sendVerifactoinEmail(
            email,
            username,
            verifyCode,
        )

        if(!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message 
            }, {status:500})
        }

        return Response.json({
            success: true,
            message: "User registered successfully!. please verify your email!" 
        }, {status:201})
        
    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            {
                success: true,
                message : "email registring user"
            },
            {
                status: 500
            }
        )
    }
}