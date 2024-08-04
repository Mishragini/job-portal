'use server';
import prisma from "@/prisma/db";

export async function getAllJobs() {
    const jobs = await prisma.job.findMany({})
    return jobs;
}

export async function getJobById(jobId:number){
    const job = await prisma.job.findUnique({
        where:{
            id:jobId
        }
    })
    return job;
}