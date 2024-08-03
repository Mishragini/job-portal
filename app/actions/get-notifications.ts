'use server';

import prisma from "@/prisma/db";

export async function getAllNotifications() {
    const notifications = await prisma.notification.findMany({});
    return notifications;
}

export async function getUnreadNotifications() {
    const unreadNotifications = await prisma.notification.findMany({ where: { read: false } });
    return unreadNotifications;
}