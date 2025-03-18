import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Device from "@/models/Device";

// GET all devices
export async function GET() {
  try {
    await dbConnect();
    const devices = await Device.find({});
    return NextResponse.json(devices);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des devices" }, { status: 500 });
  }
}

// POST new device
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const device = await Device.create(body);
    return NextResponse.json(device, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création du device" }, { status: 500 });
  }
} 