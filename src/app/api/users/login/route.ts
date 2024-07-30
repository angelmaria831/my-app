import { connect } from '@/dbConfig/db';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

async function POST(request: NextRequest): Promise<NextResponse> {
    try {

        const reqBody = await request.json()
        const { username, password } = reqBody;
        console.log({ reqBody })

        //check if user exists
        const user = await User.findOne({ username })
        if (user === null) return NextResponse.json(
            { error: `User dont exists` },
            { status: 400 })

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) return NextResponse.json(
            { error: `Invalid Password` },
            { status: 400 })

        //create token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: `Login Successfull`,
            id: user._id,
            success: true
        }, { status: 200 })

        response.cookies.set("token", token, { httpOnly: true })

        return response;

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}

export {POST}
