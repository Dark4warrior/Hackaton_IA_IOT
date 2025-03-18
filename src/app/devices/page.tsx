"use client";

import { useState, useEffect } from "react";
import "./DevicesPage.css";

interface Device {
  _id: string;
  name: string;
  location: string;
  state: boolean;
  color: string;
  brightness: number;
  createdAt: string;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  // Charger les devices depuis l'API
  useEffect(() => {
    fetch("/api/v1/devices")
      .then((res) => res.json())
      .then((data) => setDevices(data));
  }, []);

  // Ajouter un nouveau device
  const addDevice = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDevice = { name, location };
    const res = await fetch("/api/v1/devices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDevice),
    });

    if (res.ok) {
      const addedDevice = await res.json();
      setDevices([...devices, addedDevice]); // Mise à jour de la liste
      setName("");
      setLocation("");
    }
  };

  // Supprimer un device
  const deleteDevice = async (id: string) => {
    const res = await fetch(`/api/v1/devices/${id}`, { method: "DELETE" });

    if (res.ok) {
      setDevices(devices.filter((device) => device._id !== id)); // Met à jour l'affichage
    }
  };

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
      <h1 className="title">Liste des objets connectés</h1>

      {/* Affichage des devices */}
      <div className="devices-grid">
        {devices.map((device) => (
          <div key={device._id} className="device-card">
            <h2 className="device-name">{device.name}</h2>
            <p>Localisation: {device.location}</p>
            <p>État:  <span style={{ color: changeStatusColor(device.state) }}>{device.state ? "Allumé" : "Éteint"}</span></p>
            <p>
              Couleur : <span style={{ color: device.color }}>{getColorName(device.color)}</span>
            </p>
            <p>Luminosité: {device.brightness}%</p>
            <p className="timestamp">Créé: {formatDate(device.createdAt)}</p>
            {/* Bouton de suppression */}
            <button onClick={() => deleteDevice(device._id)} className="delete-button">
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* Formulaire d'ajout */}
      <div className="form-container">
        <h2 className="form-title">Ajouter un Device</h2>
        <form onSubmit={addDevice} className="device-form">
          <input
            type="text"
            placeholder="Nom du device"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Emplacement"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="add-button">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
