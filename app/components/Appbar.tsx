'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Notification } from "./Notifications"
import { getUnreadNotifications } from "../actions/get-notifications"

export const Appbar = () => {
    const { data: session, status } = useSession()
    const [showNotifications, setShowNotifications] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (session) {
            fetchUnreadCount()
        }
    }, [session])

    const fetchUnreadCount = async () => {
        try {
            const response = await getUnreadNotifications();
            setUnreadCount(response.length)
        } catch (error) {
            console.error('Error fetching unread count:', error)
        }
    }

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
                    <div className="flex justify-center items-center space-x-4">
                        {session ? (
                            <>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className="text-white relative"
                                    >
                                        <Image src='/bell.svg' alt="bell-icon" width={24} height={24} className="stroke-white" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>
                                    {showNotifications && (
                                        <div className="absolute right-0 w-[400px] bg-white rounded-lg shadow-xl z-10 transform translate-x-1/3">
                                            <Notification />
                                        </div>
                                    )}
                                </div>
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