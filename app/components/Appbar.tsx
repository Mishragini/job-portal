'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from 'next/link'

export const Appbar = () => {
    const { data: session, status } = useSession()

    return (
        <header className="relative w-full h-[400px]">
            <Image
                src="/header.png"
                alt="header image"
                layout="fill"
                objectFit="cover"
                quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col">
                <nav className="flex justify-end items-center p-4">
                    <div className="flex items-center space-x-4">
                        {session ? (
                            <>
                                <span className="text-white">Signed in as {session.user?.email}</span>
                                <button onClick={() => signOut()} className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <button onClick={() => signIn('google')} className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
                                Log in
                            </button>
                        )}
                        <Link href="/post-job" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Post a remote job
                        </Link>
                    </div>
                </nav>
                <div className="flex-grow flex justify-center items-center">
                    <Link href="/" className="text-5xl font-bold text-white text-center">
                        100xdevs | Job Portal
                    </Link>
                    
                </div>
            </div>
        </header>
    )
}