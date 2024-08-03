import { Appbar } from "./components/Appbar";
import JobsList from "./components/JobsList";

export default function Home() {
  return (
    <>
      <Appbar />
      <main className="flex min-h-screen flex-col items-center justify-between my-4 mx-2">
        <JobsList />
      </main>
    </>

  );
}
