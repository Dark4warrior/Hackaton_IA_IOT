"use client";

import { useState, useEffect } from "react";
import "./CommandsPage.css"; // Import du fichier CSS

interface Device {
    _id: string;
    name: string;
    location: string;
    state: boolean;
    color: string;
  }

interface Command {
  _id: string;
  device: Device;
  action: {
    action_key: string;
    action_value: string;
  };
  updatedAt: string;
}

  // Fonction qui modifie la couleur du texte du statut selon son état

  const changeStatusColor = (state: boolean) => {
    return state ? "green" : "red"; // Vert si allumé, rouge si éteint
  };

  // Fonction qui liste les couleurs pour afficher la couleur à laquelle correspond l'hex au lieu de l'hexadecimal
  const getColorName = (hex: string) => {
    const colors: { [key: string]: string } = {
      "#FFFFFF": "Blanc",
      "#000000": "Noir",
      "#FF0000": "Rouge",
      "#00FF00": "Vert",
      "#0000FF": "Bleu",
      "#FFFF00": "Jaune",
      "#FFA500": "Orange",
      "#800080": "Violet",
      "#FFC0CB": "Rose",
      "#A52A2A": "Marron",
      "#808080": "Gris",
      "#008080": "Turquoise",
      "#4B0082": "Indigo",
      "#FFD700": "Or"
    };
  
    return colors[hex.toUpperCase()] || "Couleur inconnue";
  };

  // Fonction qui retourne l'affichage dynamique selon l'action
  const getActionDisplay = (action_key: string, action_value: string) => {
    if (action_key === "POWER") {
      const isOn = action_value.toLowerCase() === "on" || action_value === "true";
      return (
        <span style={{ color: changeStatusColor(isOn) }}>
          {isOn ? "Allumé" : "Éteint"}
        </span>
      );
    } else if (action_key === "COLOR") {
      return (
        <span style={{ color: action_value }}>
          {getColorName(action_value)}
        </span>
      );
    } else {
      return action_value; // Pour toute autre action (ex: BRIGHTNESS)
    }
  };
  
  export default function CommandsPage() {
    const [commands, setCommands] = useState<Command[]>([]);
  
    // Charger l'historique des commandes depuis l'API
    useEffect(() => {
      fetch("/api/v1/commands")
        .then((res) => res.json())
        .then((data) => setCommands(data));
    }, []);
  
    // Fonction pour formater les dates
    const formatDate = (date: string) => {
      return new Date(date).toLocaleString("fr-FR", {
        weekday: "short",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };
  
    return (
      <div className="container">
        <h1 className="title">Historique des Commandes</h1>
  
        {commands.length === 0 ? (
          <p className="empty-message">Aucune commande enregistrée.</p>
        ) : (
          <div className="commands-grid">
            {commands.map((command) => (
              <div key={command._id} className="command-card">
                <h2 className="device-name">
                  {command.device.name} ({command.device.location})
                </h2>
                <p className="action">
                  Action: <strong>{command.action.action_key}</strong> →{" "}
                  {getActionDisplay(command.action.action_key, command.action.action_value)}
                </p>
                <p className="timestamp">Modifié: {formatDate(command.updatedAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }