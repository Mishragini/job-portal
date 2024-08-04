'use client'
import { useEffect, useState } from "react";
import { getAllJobs } from "../actions/get-jobs";
import JobCard from "./JobCard";
import { Job } from "../jobs/apply/[jobId]/page";
import { useRecoilValue } from "recoil";
import { searchBarInput } from "@/store/state";

const JobsList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const searchInput = useRecoilValue(searchBarInput);

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

    const filteredJobs = (searchInput !=='') ? jobs.filter(job =>
        job.title.toLowerCase().includes(searchInput.toLowerCase())
    ) : jobs;

    return (
        <div className="w-full">
            {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                    <JobCard
                        key={job.id}
                        job={job}
                    />
                ))
            ) : (
                <div>No jobs found</div>
            )}
        </div>
    );
}

export default JobsList;
