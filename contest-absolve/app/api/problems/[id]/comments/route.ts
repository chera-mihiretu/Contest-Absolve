import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("contest-absolve");
    const comment = await request.json();

    const result = await db.collection("problems").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $push: {
          comments: {
            ...comment,
            _id: new ObjectId(),
            createdAt: new Date(),
          },
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Problem not found" },
        { status: 404 }
      );
    }

    const updatedProblem = await db
      .collection("problems")
      .findOne({ _id: new ObjectId(params.id) });

    return NextResponse.json(updatedProblem);
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
} 