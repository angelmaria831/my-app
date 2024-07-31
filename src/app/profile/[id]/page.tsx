"use client";

import axios from "axios"
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {

    const router = useRouter()

    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        username: '',
        address: '',
        city: '',
        country: '',
    })
    const [loading, setLoading] = useState(true)

    const getUserDetails = async () => {
        try{
            const response = await axios.get(`/api/users/me`)
            console.log(response.data.data)
            if (response.status === 200) {setUserData(response.data.data);setLoading(false)}
            else { throw Error(` Something went wrong : ${response.data.error}`) }
        }catch(error : any){
            console.error(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const onlogout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push('/login')
        } catch (error: any) {
            console.log("error")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Image
                src="/background-image.jpg"
                alt="Background Image"
                fill
                style={{objectFit:"cover"}}
                quality={100}
                className="pointer-events-none"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col">
                <div className="bg-teal-900 bg-opacity-60 shadow-md ">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <h1 className="text-3xl text-white font-bold">My-App</h1>
                        </div>
                        <button
                            onClick={onlogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >Logout
                        </button>
                    </div>

                </div>
                <div className="container mx-auto p-20">
                   { loading ? 
                   <div className="text-center justify-center">
                   <div role="status">
                       <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                       </svg>
                       <span className="sr-only">Loading...</span>
                   </div>
               </div>
                   :
                   ( <div className="bg-white backdrop-blur-sm bg-opacity-60 shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h1 className="ml-4 text-2xl text-center text-teal-900 font-bold">Welcome, {userData.fname} !</h1>
                        </div>
                        <div className="ml-5 grid grid-cols-1 md:grid-cols-2 gap-60">
                            <div>
                                <div className="flex items-center mb-4">
                                    <label className="text-gray-700 semi-bold font-medium mr-2 p-1 w-24">Full Name </label>
                                    <p className="flex-1 text-gray-900">: {userData.fname + " " + userData.lname}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <label className="text-gray-700 font-medium mr-2 p-1 w-24">E-mail </label>
                                    <p className="flex-1 text-gray-900">: {userData.email}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <label className="text-gray-700 font-medium mr-2 p-1 w-24">Username </label>
                                    <p className="flex-1 text-gray-900">: {userData.username}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center mb-4">
                                    <label className="text-gray-700 font-medium mr-2 p-1 w-24">Address </label>
                                    <p className="flex-1 text-gray-900">: {userData.address}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <label className="text-gray-700 font-medium mr-2 p-1 w-24">City </label>
                                    <p className="flex-1 text-gray-900">: {userData.city}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <label className="text-gray-700 font-medium mr-2 p-1 w-24">Country </label>
                                    <p className="flex-1 text-gray-900">: {userData.country}</p>
                                </div>

                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>)
}

