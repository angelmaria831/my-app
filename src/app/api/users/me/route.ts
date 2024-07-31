import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/models/userModel";
import {connect} from "@/dbConfig/db"



async function GET(request : NextRequest): Promise<NextResponse>{

    try{
        await connect();
        const token = request.cookies.get('token')?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        const userId = decodedToken.id

        const user = await User.findOne({_id :userId}, 
            {username:1,
            email:1,
            fname:1,
            lname:1,
            address:1,
            city:1,
            country:1})

        if (user === null) 
            return NextResponse.json(
                { error: `Failed to fetch user details. Please try again.` },
                { status: 400 })

        return NextResponse.json({
            message :  "User Found!",
            success : true,
            data : user},
            {status : 200})

    }catch(error : any){
        return NextResponse.json(
            {error : error},
            {status:400})
    }
  
}

export {GET}