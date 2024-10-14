import dbConnect from '@/lib/dbConnect'
import UserModel from "@/models/User.model"
import mongoose from "mongoose"
import { getServerSession } from 'next-auth/next'
import { authOptions } from "../auth/[...nextauth]/options"
import { User } from 'next-auth'

export async function GET(request : Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    console.log(session)
    const _user:User  = session?.user

    if(!session || !_user) {
        return Response.json({
            success: false,
            message: "Not Authenticated!"
        }, {status : 401})
    }
    const userId = new mongoose.Types.ObjectId(session.user._id)
    try {
        const user = await UserModel.aggregate([
            {$match : {_id : userId}},
            {$unwind: '$messages'},
            {$sort: {'messages.createdAt' : -1}},
            {$group: {_id: '$_id', messages: {$push: '$messages'}}},

        ]).exec()
        console.log(user)

        if(!user || user.length === 0) {
            return Response.json({
                success: false,
                message: "User not found!"
            }, {status : 401})
        }

        return Response.json(
            { messages: user[0].messages},
            {
                status: 200
            }
    );
    } catch (error:any) {
        console.error("An Unexpected error", error)
        return Response.json({
            success: false,message: "Internal server error"
        }, {status : 500}
        );
    }  
}