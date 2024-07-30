"use client";

import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import Image from "next/image";
import axios from "axios";

export default function loginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)


    const onLogin = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('')
        try {
            setLoading(true)
            const response = await axios.post(`/api/users/login`, user)

            if(response.status === 200) router.push(`/profile/${response.data.id}`)
            else throw Error(`Login Failed : ${response.data.error}`)
            
        } catch (error: any) {
            setErrorMessage(error.response?.data?.error || `Login Failed`)
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="min-h-screen flex flex-col" >
            <Image
                src="/background-image.jpg"
                alt="Background Image"
                layout="fill"
                objectFit="cover"
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
                <div className="flex-grow flex items-center justify-center pt-16">

                    <div className="relative bg-white shadow-lg flex flex-col md:flex-row md:max-w-3xl w-full rounded-lg overflow-hidden">
                        <div className="relative md:flex-1">
                            <Image
                                src="/login.png"
                                alt="Login Image"
                                layout="fill"
                                objectFit="cover"
                                className="h-full"
                            />
                        </div>

                        <div className="md:flex-1 p-8 flex flex-col justify-center items-center">
                            <h1 className="text-3xl text-teal-900 font-semibold mb-6">Sign in to your account</h1>
                            <form onSubmit={onLogin} className="space-y-6 w-full max-w-xs">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={user.username}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                        required
                                        className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                    <div className="relative">
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            id="password"
                                            value={user.password}
                                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            required
                                            className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 p-2 text-gray-400 hover:text-gray-600"
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d={
                                                        passwordVisible
                                                            ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                            : 'M13.875 18.825A10.95 10.95 0 0112 19.5C7.305 19.5 3.75 16.245 2.25 12c.69-1.845 1.755-3.465 3.075-4.65m1.8-1.5A10.875 10.875 0 0112 4.5c4.695 0 8.25 3.255 9.75 7.5-.69 1.845-1.755 3.465-3.075 4.65m-1.8 1.5a10.875 10.875 0 01-4.65 1.8M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                                    }
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                {errorMessage && (
                                    <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                                )}

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-teal-800'} text-white rounded hover:bg-teal-900`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>
                            </form>
                            <button
                                onClick={() => router.push('/signup')}
                                className="mt-6 w-full py-2 px-4 bg-transparent border border-teal-800 text-teal-800 rounded hover:bg-teal-900 hover:text-white"
                            >Create Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}