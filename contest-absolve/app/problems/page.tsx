"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Problem {
  _id: string;
  title: string;
  contestLink: string;
  problemLink: string;
  description: string;
  userName: string;
  createdAt: string;
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("/api/problems");
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Problems</h1>
      <div className="space-y-4">
        {problems.map((problem) => (
          <div
            key={problem._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{problem.title}</h2>
                <p className="text-gray-600 mb-4">{problem.description}</p>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <a
                    href={problem.contestLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Contest Link
                  </a>
                  <a
                    href={problem.problemLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Problem Link
                  </a>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Posted by {problem.userName}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(problem.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Link
              href={`/problems/${problem._id}`}
              className="mt-4 inline-block text-blue-500 hover:underline"
            >
              View Discussion
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 