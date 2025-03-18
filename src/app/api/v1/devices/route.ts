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

// POST device
export async function POST(request: Request) {
  try {
    const { name, location } = await request.json();

    if (!name || !location) {
      return NextResponse.json(
        { error: "Le nom et l'emplacement sont requis" },
        { status: 400 }
      );
    }

    await dbConnect();
    const newDevice = await Device.create({ name, location, state: false, color: "#FFFFFF", brightness: 100 });

    return NextResponse.json(newDevice);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'ajout du device" },
      { status: 500 }
    );
  }
}