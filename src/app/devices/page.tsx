"use client";

import { useState, useEffect } from "react";

interface Device {
  _id: string;
  name: string;
  location: string;
  state: boolean;
  color: string;
  brightness: number;
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
      setDevices([...devices, addedDevice]); // mise à jour de la liste 
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📡 Liste des Devices</h1>

      {/*Affichage des devices*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div key={device._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{device.name}</h2>
            <p className="text-gray-600">📍 {device.location}</p>
            <p>💡 État: {device.state ? "Allumé" : "Éteint"}</p>
            <p>🎨 Couleur: <span style={{ color: device.color }}>{device.color}</span></p>
            <p>🔆 Luminosité: {device.brightness}%</p>

            {/*Bouton de suppression*/}
            <button
              onClick={() => deleteDevice(device._id)}
              className="mt-2 p-2 bg-red-500 text-white rounded"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/*Formulaire d'ajout*/}
      <div className="mt-6 p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Ajouter un Device</h2>
        <form onSubmit={addDevice} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nom du device"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Emplacement"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
