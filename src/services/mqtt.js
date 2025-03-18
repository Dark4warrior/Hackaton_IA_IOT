// services/mqtt.js - version modifiée
import mqtt from 'mqtt';

class MQTTService {
    constructor() {
        this.client = null;
        this.isConnected = false;
        this.subscriptions = {};
    }

    connect(host = "localhost", username= "admin", password = "admin", port = 9001) { // Port par défaut modifié à 9001
        // Construction de l'URL WebSocket
        const url = `ws://${host}:${port}`;
        console.log(`Tentative de connexion à ${url}`);

        const options = {
            username,
            password,
            clientId: `nextjs_${Math.random().toString(16).substring(2, 10)}_${new Date().getTime()}`,
            keepalive: 60,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            clean: true
        };

        try {
            this.client = mqtt.connect(url, options);

            this.client.on('connect', () => {
                console.log('Connecté au broker MQTT');
                this.isConnected = true;
            });

            this.client.on('reconnect', () => {
                console.log('Tentative de reconnexion au broker MQTT');
            });

            this.client.on('error', (err) => {
                console.error('Erreur de connexion MQTT:', err);
                this.isConnected = false;
            });

            this.client.on('close', () => {
                console.log('Connexion MQTT fermée');
                this.isConnected = false;
            });

            this.client.on('message', (topic, message) => {
                console.log(`Message reçu sur ${topic}: ${message.toString()}`);

                if (this.subscriptions[topic]) {
                    this.subscriptions[topic].forEach(callback => {
                        callback(message.toString());
                    });
                }
            });

            return true;
        } catch (error) {
            console.error('Erreur lors de la création du client MQTT:', error);
            return false;
        }
    }

    disconnect() {
        if (this.client) {
            this.client.end();
            this.isConnected = false;
            this.subscriptions = {};
        }
    }

    publish(topic, message) {
        if (!this.isConnected || !this.client) {
            console.error('Client MQTT non connecté');
            return false;
        }

        try {
            this.client.publish(topic, message);
            return true;
        } catch (error) {
            console.error('Erreur lors de la publication:', error);
            return false;
        }
    }

    subscribe(topic, callback) {
        if (!this.isConnected || !this.client) {
            console.error('Client MQTT non connecté');
            return false;
        }

        try {
            this.client.subscribe(topic, (err) => {
                if (err) {
                    console.error(`Erreur lors de l'abonnement à ${topic}:`, err);
                    return;
                }
                console.log(`Abonné avec succès à ${topic}`);
            });

            // Stocker le callback
            if (!this.subscriptions[topic]) {
                this.subscriptions[topic] = [];
            }
            this.subscriptions[topic].push(callback);

            return true;
        } catch (error) {
            console.error('Erreur lors de la souscription:', error);
            return false;
        }
    }

    unsubscribe(topic) {
        if (!this.isConnected || !this.client) {
            console.error('Client MQTT non connecté');
            return false;
        }

        try {
            this.client.unsubscribe(topic);
            delete this.subscriptions[topic];
            return true;
        } catch (error) {
            console.error('Erreur lors du désabonnement:', error);
            return false;
        }
    }
}

const mqttService = new MQTTService();
export default mqttService;
