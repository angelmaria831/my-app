"use client";

import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function SignUpPage() {

    const router = useRouter();
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        username: "",
        password: "",

    })

    const [loading, setLoading] = React.useState(false)
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSignUp = async (e: FormEvent) => {

        e.preventDefault();
        setErrorMessage('');

        try {
            setLoading(true);

            const response = await axios.post(`/api/users/signup`, user);

            if(response.status === 201) router.push(`/login`)
            else throw Error(`Signup Failed : ${response.data.error}`)
            
        } catch (error: any) {
            setErrorMessage(error.response?.data?.error || `Signup Failed`)
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="min-h-screen flex flex-col ">
            <Image
                src="/background-image.jpg"
                alt="Background Image"
                fill
                style={{objectFit:"cover"}}
                quality={100}
                className="pointer-events-none"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col">
                <nav className="bg-teal-900 bg-opacity-60 shadow-md ">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <h1 className="text-3xl text-white font-bold">My-App</h1>
                        </div>
                    </div>
                </nav>

                <div className="flex-grow flex items-center justify-center pt-24">
                    <div className="relative bg-white shadow-lg flex flex-col md:flex-row md:max-w-3xl w-full rounded-lg ">
                        <div className="md:flex-1 p-6 flex flex-col justify-center items-center overflow-y-auto h-150">

                            <h1 className="text-3xl text-teal-900 font-semibold mb-6">Create your account</h1>
                            <div className="overflow-y-auto w-full max-w-lg">

                                <form onSubmit={onSignUp} className="space-y-6">
                                    <div className="flex items-center mb-4">
                                        <label htmlFor="fname" className="text-sm font-medium mr-2 w-24">First Name</label>
                                        <input
                                            type="text"
                                            id="fname"
                                            value={user.fname}
                                            onChange={(e) => setUser({ ...user, fname: e.target.value })}
                                            required
                                            className="flex-1 p-1 bg-gray-100 border border-gray-300 rounded w-34"
                                        />
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <label htmlFor="lname" className="text-sm font-medium mr-2 w-24">Last Name</label>
                                        <input
                                            type="text"
                                            id="lname"
                                            value={user.lname}
                                            onChange={(e) => setUser({ ...user, lname: e.target.value })}
                                            required
                                            className="flex-1 p-1 bg-gray-100 border border-gray-300 rounded w-34"
                                        />
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <label htmlFor="email" className="text-sm font-medium mr-2 w-24">E-mail</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={user.email}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            required
                                            className="flex-1 p-1 bg-gray-100 border border-gray-300 rounded w-34"
                                        />
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <label htmlFor="username" className="text-sm font-medium mr-2 w-24">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={user.username}
                                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                                            required
                                            className="flex-1 p-1 bg-gray-100 border border-gray-300 rounded w-34"
                                        />
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <label htmlFor="password" className="text-sm font-medium mr-2 w-24">Password</label>                               
                                        <input
                                            type='text'
                                            id="password"
                                            value={user.password}
                                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            required
                                            className="flex-1 p-1 bg-gray-100 border border-gray-300 rounded w-34"
                                        />
           
                                    </div>
                                    {errorMessage && (
                                    <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                                )}
                                    <div className="flex items-center justify-center">
                                        <button
                                            type="submit"
                                            className={`w-78 py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-teal-700'} text-white rounded hover:bg-teal-900`}
                                            disabled={loading}
                                        >
                                            {loading ? 'Creating Account...' : 'Register'}
                                        </button>
                                    </div>

                                </form></div>
                            <div className="mt-2 text-sm text-black-600">
                                Already have an account?
                                <span className="mt-2 text-sm text-black-600 font-semibold hover:underline"> <Link href={`/login`}> LogIn</Link></span>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}