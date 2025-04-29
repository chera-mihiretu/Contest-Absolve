"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface Comment {
  _id: string;
  content: string;
  userName: string;
  createdAt: string;
}

interface Problem {
  _id: string;
  title: string;
  contestLink: string;
  problemLink: string;
  description: string;
  userName: string;
  createdAt: string;
  comments: Comment[];
}

export default function ProblemDiscussion() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`/api/problems/${id}`);
        const data = await response.json();
        setProblem(data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !newComment.trim()) return;

    try {
      const response = await fetch(`/api/problems/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          userId: session.user?.email,
          userName: session.user?.name,
        }),
      });

      if (response.ok) {
        const updatedProblem = await response.json();
        setProblem(updatedProblem);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!problem) {
    return <div className="text-center">Problem not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
        <p className="text-gray-600 mb-4">{problem.description}</p>
        <div className="flex space-x-4 text-sm text-gray-500 mb-4">
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
        <p className="text-sm text-gray-500">
          Posted by {problem.userName} on{" "}
          {new Date(problem.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Discussion</h2>
        
        {session ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded-md"
              rows={3}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="text-gray-500">
            Please sign in to participate in the discussion.
          </p>
        )}

        <div className="space-y-4">
          {problem.comments?.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <p className="text-gray-600">{comment.content}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span>{comment.userName}</span>
                <span className="mx-2">•</span>
                <span>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 