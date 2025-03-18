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

    console.log("device: ", device);

    if (!device) {
      return NextResponse.json(
        { error: "Device introuvable. Vérifiez le nom et l'emplacement." },
        { status: 404 }
      );
    }

     // Mise à jour des données du device
     const updateFields: any = {};
    
     switch (processedCommand.action.action_key) {
       case "POWER":
         updateFields.state = processedCommand.action.action_value;
         break;
       case "COLOR":
         updateFields.color = processedCommand.action.action_value;
         break;
       case "BRIGHTNESS":
         updateFields.brightness = processedCommand.action.action_value;
         break;
       default:
         return NextResponse.json(
           { error: "Action non reconnue" },
           { status: 400 }
         );
     }
 
     // Appliquer les mises à jour
     await Device.updateOne({ _id: device._id }, { $set: updateFields });

    // Créer la commande
    const command = await Command.create({
      device: device._id,
      action: processedCommand.action
    });

    return NextResponse.json({
      message: "Commande traitée et device mis à jour",
      updatedFields: updateFields,
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