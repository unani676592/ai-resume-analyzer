import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])



  return <main className="bg-[url('/images/bg-main.svg') bg-cover">
  <Navbar />

    <section className= "main-section">
      <div className="page-heading py-16">
        <h1>
          Track Your Applications and & Resume Ratings
        </h1>
        <h2>
          Review your Submission and check AI-powered feedback.
        </h2>
      </div>
    {resumes.length > 0 && (
        <div className= "resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
    )}
    </section>
  </main>
}
