import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Command from "@/models/Command";

// GET all commands
export async function GET() {
  try {
    await dbConnect();
    const commands = await Command.find({})
      .populate("device") // Récupère les détails du device lié
      .sort({ createdAt: -1 }); // Trie par date décroissante

    return NextResponse.json(commands);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des commandes" },
      { status: 500 }
    );
  }
}

// POST new command
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const command = await Command.create(body);
    return NextResponse.json(command, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la création de la commande" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  // Récupère deviceId des paramètres de requête
  const url = new URL(request.url);
  const deviceId = url.searchParams.get('deviceId');

  // Supprime toutes les commandes de cet appareil
  const result = await Command.deleteMany({ device: deviceId });
} 