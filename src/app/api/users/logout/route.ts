import { NextResponse } from "next/server";

async function GET(){

    try{
        const response = NextResponse.json(
            {
                message : "Logout Successfull",
                success : true
            },{status : 200})

            response.cookies.set("token", "", {httpOnly : true,
                expires : new Date(0)
            });

            return response

    }catch(error :  any){
        return NextResponse.json({error : error.message},
                                {status : 500})
    }
}

export {GET}