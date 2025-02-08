"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState({email: '', password: ''});
    const [errorMessage, setErrrorMessage] = useState('');

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            if (user.email && user.password) {
                setErrrorMessage('');
                const res = await axios.post('/api/login', user);
                if(res.status === 200) router.push('/');
            } else if (!user.email || !user.password) {
                setErrrorMessage('Please fill all the fields');
            }
        } catch(err) {
            console.log(err);
            if(err.status === 400 || err.status === 401) setErrrorMessage(err.response.data.message);
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md bg-slate-100 rounded p-8">
                <div>
                    <Image
                        width={100}
                        height={100}
                        alt="Your Company"
                        src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg"
                        className="mx-auto h-10 w-auto"/>
                    <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Log in to your account  
                    </h2>
                </div>
                <div className="mt-5">
                    <form action="#" method="POST" className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-xl font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white text-xl px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-xl font-medium text-gray-900">
                                Password
                                </label>
                                <div className="text-xl">
                                {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a> */}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-xl text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={(e) => handleSubmit(e)}>
                                Log in
                            </button>
                        </div>
                    </form>
                    <span className="text-lg font-bold text-red-600">{errorMessage}</span>
                    <p className="mt-2 text-center text-md text-gray-500">
                        Don&apos;t have an account?{' '}
                        <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}