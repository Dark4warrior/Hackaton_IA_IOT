import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Device from "@/models/Device";

// GET single device
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const device = await Device.findById(params.id);
    if (!device) {
      return NextResponse.json({ error: "Device non trouvé" }, { status: 404 });
    }
    return NextResponse.json(device);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération du device" }, { status: 500 });
  }
}

// PUT update device
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const device = await Device.findByIdAndUpdate(params.id, body, { new: true });
    if (!device) {
      return NextResponse.json({ error: "Device non trouvé" }, { status: 404 });
    }
    return NextResponse.json(device);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour du device" }, { status: 500 });
  }
}

// DELETE device
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const deletedDevice = await Device.findByIdAndDelete(params.id);

    if (!deletedDevice) {
      return NextResponse.json({ error: "Device introuvable" }, { status: 404 });
    }

    return NextResponse.json({ message: "Device supprimé avec succès" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression du device" }, { status: 500 });
  }
}

