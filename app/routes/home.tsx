import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {resumes} from"../../constants";
import {usePuterStore} from "~/lib/puter";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback tot your fram job!" },
  ];
}

export default function Home() {
  const{ isLoading,auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if(auth.isAuthenticated) navigate('/auth?next=/');
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
