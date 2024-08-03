'use server';
import prisma from "@/prisma/db";

export async function getAllJobs() {
    const jobs = await prisma.job.findMany({})
    return jobs;
}