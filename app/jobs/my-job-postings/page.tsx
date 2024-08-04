'use client';
import { getJobsByAuthorId } from "@/app/actions/get-jobs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Job } from "../apply/[jobId]/page";
import JobCard from "@/app/components/JobCard";
import { FaSpinner, FaBriefcase } from 'react-icons/fa';

const UserJobs = () => {
    const { data: session, status } = useSession();
    const authorEmail = session?.user?.email;
    const [jobsByAuthor, setJobsByAuthor] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authorEmail) {
            const getJobs = async () => {
                setIsLoading(true);
                try {
                    const jobs = await getJobsByAuthorId(authorEmail);
                    setJobsByAuthor(jobs);
                } catch (error) {
                    console.error("Error fetching jobs:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            getJobs();
        }
    }, [authorEmail]);

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    if (!authorEmail) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <FaBriefcase className="text-6xl text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Not Logged In</h2>
                <p className="text-gray-600">Please log in to see the jobs you've posted.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Posted Jobs</h1>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-blue-500" />
                </div>
            ) : jobsByAuthor.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobsByAuthor.map((job) => (
                        <JobCard key={job.id} job={job} isAuthor={true} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FaBriefcase className="mx-auto text-5xl text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Jobs Posted Yet</h2>
                    <p className="text-gray-600">Start posting jobs to see them listed here.</p>
                </div>
            )}
        </div>
    );
};

export default UserJobs;