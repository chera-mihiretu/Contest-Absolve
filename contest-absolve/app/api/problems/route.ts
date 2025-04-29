import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("contest-absolve");
    const problems = await db
      .collection("problems")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(problems);
  } catch (error) {
    console.error("Error fetching problems:", error);
    return NextResponse.json(
      { error: "Failed to fetch problems" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("contest-absolve");
    const problem = await request.json();

    const result = await db.collection("problems").insertOne({
      ...problem,
      createdAt: new Date(),
      comments: [],
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating problem:", error);
    return NextResponse.json(
      { error: "Failed to create problem" },
      { status: 500 }
    );
  }
} 