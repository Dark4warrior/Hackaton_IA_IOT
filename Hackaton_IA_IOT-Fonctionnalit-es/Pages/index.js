import { useState } from 'react';

export default function Home() {
  const [lampStatus, setLampStatus] = useState(false); // false pour 'off', true pour 'on'
  const [loading, setLoading] = useState(false); // Pour afficher le chargement
  const deviceId = "67d94b648fddca4faf305099"; // Identifiant unique de la lampe

  const toggleLamp = async () => {
    setLoading(true); // Démarre le chargement

    const newStatus = lampStatus ? 'OFF' : 'ON'; // Inverse l'état de la lampe

    const action = {
      action_key: 'POWER',
      action_value: newStatus
    };

    try {
      const res = await fetch('/api/lamp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ device: deviceId, action })
      });

      if (res.ok) {
        const data = await res.json();
        setLampStatus(data.state); // Met à jour l'état de la lampe après la réponse
      } else {
        console.error('Erreur lors de la communication avec l\'API');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false); // Arrête le chargement
    }
  };

  return (
    <div style={styles.container}>
      <h1>Contrôle de la Lampe</h1>
      <div style={styles.statusContainer}>
        <p style={styles.statusText}>
          La lampe est actuellement: <strong>{lampStatus ? 'Allumée' : 'Éteinte'}</strong>
        </p>
      </div>
      <button
        onClick={toggleLamp}
        style={lampStatus ? styles.buttonOn : styles.buttonOff}
        disabled={loading}
      >
        {loading ? 'Chargement...' : lampStatus ? 'Éteindre' : 'Allumer'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  statusContainer: {
    marginBottom: '20px',
  },
  statusText: {
    fontSize: '18px',
    color: '#333',
  },
  buttonOn: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonOff: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
