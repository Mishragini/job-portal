'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function postJob(jobDetails: {
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    salary: string;
    authorEmail: string;
}) {
    const { title, company, location, type, description, requirements, salary, authorEmail } = jobDetails;

    // Find the author by email
    const author = await prisma.user.findUnique({
        where: {
            email: authorEmail
        }
    });

    if (!author) {
        throw new Error('Author not found');
    }

    const authorId = author.id;

    try {
        // Create the job in the database
        const job = await prisma.job.create({
            data: {
                title,
                company,
                location,
                jobType: type,
                jobDescription: description,
                requirements,
                salaryRange: salary,
                author: {
                    connect: { id: authorId }
                }
            }
        });

        // Get all users except the author
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authorId
                }
            }
        });

        // Create notifications for all users except the author
        const notifications = users.map(user => ({
            message: `New job posted: ${title} at ${company}`,
            userId: user.id
        }));

        await prisma.notification.createMany({
            data: notifications
        });

        return { message: 'Job posted and notifications sent', job };
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while posting the job');
    }
}
