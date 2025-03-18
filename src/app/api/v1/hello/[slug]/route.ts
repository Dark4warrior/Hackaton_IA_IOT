import dbConnect from "@/lib/mongodb";
import Test from "@/models/Test";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // await dbConnect(); // Needed to use the DB
  // const test = await Test.findOne(); // To use the DB

  return NextResponse.json({ message: slug });
}
