import {connect} from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



async function POST(request : NextRequest) : Promise<NextResponse> {
    try{
        await connect();
        const reqBody = await request.json()
        const {fname, lname, email, username, password} = reqBody
        console.log({reqBody})
        if(!fname || !lname || !email || !username || !password)
            return NextResponse.json(
                { error: `Bad Request` },
                { status: 400 })

        //check if user exists
        const user = await User.findOne({username, email})

        if(user) 
            return NextResponse.json(
                    {error : "User already exists"},
                    {status : 400})
        
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt) 

        //create User
        const newUser = await new User({
                                    fname,
                                    lname,
                                    username,
                                    email,
                                    password : hashedPassword
                                }).save()
       
        return NextResponse.json(
                {message : "User created Successfully",
                success : true,
                newUser},
                {status :201})

    }catch(error : any){
        return NextResponse.json(
            {error : error.message},
            {status : 500}
        )
    }
}

export {POST}