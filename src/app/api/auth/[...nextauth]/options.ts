import { NextAuthOptions } from "next-auth";
import CredentialsProvoder from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";


 export const authOptions : NextAuthOptions =  {
    providers : [
        CredentialsProvoder({
            id: "credentials",
            name: "credentials",
            credentials: {
                emial: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password"}
              },
              async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {username: credentials.identifier},
                            {email: credentials.identifier}
                        ]
                    })

                    if(!user) {
                        throw new Error("No user found with this email")
                    }

                    if(!user.isVerify) {
                        throw new Error("Please verify your account!")
                    } 
                    const isPasswordCorrect = await bcrypt.compare(credentials.password , user.password)

                    if(!isPasswordCorrect) {
                        throw new Error("Incorrect password")
                    }
                    return user
                } catch (error : any ) {
                 throw new Error(error )  
                }
              }

        })
    ],
    callbacks: {
        async jwt ({token, user}) {
            if(user) {
                token._id = user._id?.toString()
                token.email = user.email
                token.username =  user.username
                token.isVerify =  user.isVerify
                token.isAccesptingMessages = user.isAcceptingMessages
            }
            return token
        },
        async session({session, token}) {
            if(token) {
                session.user._id = token._id
                session.user.email = token.email
                session.user.isAcceptingMessages = token.isAccesptingMessages
                session.user.isVerify = token.isVerify
                session.user.username = token.username 
            }
            return session
        }

    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET
 }