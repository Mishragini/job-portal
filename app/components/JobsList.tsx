'use client'
import { useEffect, useState } from "react";
import { getAllJobs } from "../actions/get-jobs";
import JobCard from "./JobCard";

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    jobType: string;
    jobDescription: string;
    requirements: string;
    salaryRange: string;
    createdAt: Date;
    authorId: number;
}

const JobsList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    const init = async () => {
        const allJobs = await getAllJobs();
        setJobs(allJobs);
    }

    useEffect(() => {
        init();
    }, []);

    if (!jobs) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-full">
            {jobs.map(job => (
                <JobCard
                    key={job.id}
                    job={job}
                />
            ))}
        </div>
    );
}

export default JobsList;