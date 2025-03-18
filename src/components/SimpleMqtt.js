// components/SimpleMqtt.js - version modifiée
import { useState, useEffect } from 'react';
import mqttService from '../services/mqtt';

export default function SimpleMqtt() {
    const [host, setHost] = useState('localhost'); // Valeur par défaut
    const [port, setPort] = useState('9001'); // Port WebSocket de Mosquitto
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [connectionStatus, setConnectionStatus] = useState('Déconnecté');
    const [isConnected, setIsConnected] = useState(false);
    const [topic, setTopic] = useState('test/topic');
    const [publishMessage, setPublishMessage] = useState('Hello MQTT');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [error, setError] = useState('');

    // Fonction pour se connecter au broker MQTT
    const handleConnect = () => {
        setError('');
        setConnectionStatus('En cours de connexion...');

        try {
            const success = mqttService.connect(host, username, password, parseInt(port));

            // On va attendre l'événement de connexion réel plutôt que de se fier au retour de connect()
            setTimeout(() => {
                if (mqttService.isConnected) {
                    setIsConnected(true);
                    setConnectionStatus('Connecté');
                } else {
                    setError('Échec de la connexion après tentative');
                    setConnectionStatus('Déconnecté');
                }
            }, 2000);
        } catch (err) {
            setError(`Erreur de connexion: ${err.message}`);
            setConnectionStatus('Erreur');
            console.error(err);
        }
    };

    // Fonction pour se déconnecter
    const handleDisconnect = () => {
        mqttService.disconnect();
        setIsConnected(false);
        setReceivedMessages([]);
        setConnectionStatus('Déconnecté');
    };

    // Le reste des méthodes reste inchangé...

    return (
        <div className="mqtt-container">
            <h2>Client MQTT Simple</h2>

            <div className="status-bar">
                <span>Status: </span>
                <span className={`status ${connectionStatus.toLowerCase()}`}>{connectionStatus}</span>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="connection-section">
                <h3>Connexion au broker MQTT</h3>
                <div className="form-group">
                    <label>Host:</label>
                    <input
                        type="text"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        placeholder="localhost"
                    />
                </div>
                <div className="form-group">
                    <label>Port WebSocket:</label>
                    <input
                        type="text"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                        placeholder="9001"
                    />
                </div>
                <div className="form-group">
                    <label>Nom d'utilisateur:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {!isConnected ? (
                    <button onClick={handleConnect}>Se connecter</button>
                ) : (
                    <button onClick={handleDisconnect}>Se déconnecter</button>
                )}
            </div>

            {/* Le reste du JSX reste inchangé... */}

            <style jsx>{`
        /* Styles existants... */
        
        .error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          border: 1px solid #ef9a9a;
        }
        
        .status-bar {
          margin-bottom: 15px;
          font-weight: bold;
        }
        
        .status {
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        .status.connecté {
          background-color: #e8f5e9;
          color: #2e7d32;
        }
        
        .status.déconnecté {
          background-color: #f5f5f5;
          color: #616161;
        }
        
        .status.erreur {
          background-color: #ffebee;
          color: #c62828;
        }
        
        .status.en.cours.de.connexion... {
          background-color: #fff8e1;
          color: #f57f17;
        }
      `}</style>
        </div>
    );
}
