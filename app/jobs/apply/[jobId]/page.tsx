export default function ({ params }: { params: { jobId: string } }) {
    return (
        <div>{params.jobId}</div>
    )
}