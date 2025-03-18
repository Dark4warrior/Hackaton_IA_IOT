import dynamic from 'next/dynamic';

// Chargement du composant uniquement côté client (pas de SSR)
const SimpleMqttWithNoSSR = dynamic(
    () => import('../components/SimpleMqtt'),
    { ssr: false }
);

export default function MqttPage() {
    return (
        <div className="container">
            <h1>Démo MQTT</h1>
            <SimpleMqttWithNoSSR />
        </div>
    );
}