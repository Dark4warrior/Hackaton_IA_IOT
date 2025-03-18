import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Command from "@/models/Command";

// GET single command
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const command = await Command.findById(params.id).populate('device');
    if (!command) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 });
    }
    return NextResponse.json(command);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération de la commande" }, { status: 500 });
  }
}

// PUT update command
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const command = await Command.findByIdAndUpdate(params.id, body, { new: true });
    if (!command) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 });
    }
    return NextResponse.json(command);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la mise à jour de la commande" }, { status: 500 });
  }
}

// DELETE command
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const command = await Command.findByIdAndDelete(params.id);
    if (!command) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 });
    }
    return NextResponse.json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression de la commande" }, { status: 500 });
  }
} 