import { NextResponse } from "next/server";
import { processCommand } from "@/lib/openai";
import dbConnect from "@/lib/mongodb";
import Device from "@/models/Device";
import Command from "@/models/Command";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Le texte de la commande est requis" },
        { status: 400 }
      );
    }

    // Traiter la commande avec ChatGPT
    const processedCommand = await processCommand(text);

    // Connecter à la base de données
    await dbConnect();

    // Trouver ou créer le device
    let device = await Device.findOne({
      location: processedCommand.device.location,
      name: processedCommand.device.name
    });

    if (!device) {
      device = await Device.create({
        name: processedCommand.device.name,
        location: processedCommand.device.location,
        state: false,
        color: "#FFFFFF",
        brightness: 100
      });
    }

    // Créer la commande
    const command = await Command.create({
      device: device._id,
      action: processedCommand.action
    });

    return NextResponse.json({
      message: "Commande traitée avec succès",
      processedCommand,
      command
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de la commande : " + error },
      { status: 500 }
    );
  }
} 