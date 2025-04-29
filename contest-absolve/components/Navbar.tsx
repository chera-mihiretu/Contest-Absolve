"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Contest Absolve
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/problems" className="hover:text-gray-300">
            Problems
          </Link>
          <Link href="/submit" className="hover:text-gray-300">
            Submit Problem
          </Link>
          
          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
} 