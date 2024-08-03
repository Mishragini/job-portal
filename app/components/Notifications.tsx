'use client'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { getAllNotifications } from '../actions/get-notifications'
import { useRouter } from 'next/navigation';

interface Notification {
    id: number;
    message: string;
    userId: number;
    createdAt: Date;
    read: boolean;
    jobId: number
}

export const Notification = () => {
    const router = useRouter()
    const [notifications, setNotifications] = useState<Notification[]>([])

    useEffect(() => {
        // Fetch notifications from the database
        fetchNotifications()
    }, [])

    const fetchNotifications = async () => {
        // Replace this with your actual API call
        const response = await getAllNotifications()
        setNotifications(response)
    }

    // const markAsRead = async (id:number) => {
    //     // Replace this with your actual API call
    //     await fetch(`/api/notifications/${id}`, {
    //         method: 'PATCH',
    //         body: JSON.stringify({ read: true }),
    //     })
    //     // Refresh notifications
    //     fetchNotifications()
    // }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold p-4 bg-gray-100">Notifications</h2>
            {notifications.length === 0 ? (
                <p className="p-4 text-gray-500">No new notifications</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                        <button onClick={() => { router.push(`/jobs/apply/${notification.jobId}`) }}>
                            <li key={notification.id} className={`p-4 hover:bg-gray-50 transition ${notification.read ? 'bg-gray-50' : ''}`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <button
                                            // onClick={() => markAsRead(notification.id)}
                                            className="ml-2 px-2 py-1 text-xs text-blue-600 hover:text-blue-800 transition"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            </li>
                        </button>
                    ))}
                </ul>
            )}
        </div>
    )
}