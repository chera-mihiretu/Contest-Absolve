"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Contest Absolve
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A platform for CSEC CPD members to discuss and solve programming problems together.
          Share your Codeforces contest problems and get help from the community.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {session ? (
            <>
              <Link
                href="/problems"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Browse Problems
              </Link>
              <Link
                href="/submit"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Submit a Problem
              </Link>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign In to Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
