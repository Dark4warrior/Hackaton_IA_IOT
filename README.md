# Light

## Requirement

- [Node.js](https://nodejs.org/fr) : 22.14+ (<23)
- [npm](https://www.npmjs.com) : 11.2+ (<12)

## Getting Started

First, install dependencies :

```bash
npm install
```

then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

Notre API est actuellement en développement local. Voici les endpoints disponibles :

### Devices

| Méthode | Endpoint              | Description                      | Paramètres                                                                                                                                    | Réponse                 |
| ------- | --------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| GET     | `/api/v1/devices`     | Récupérer tous les appareils     | -                                                                                                                                             | Liste des appareils     |
| GET     | `/api/v1/devices/:id` | Récupérer un appareil spécifique | `id`: ID de l'appareil                                                                                                                        | Détails de l'appareil   |
| POST    | `/api/v1/devices`     | Créer un nouvel appareil         | `name`: Nom de l'appareil<br>`location`: Emplacement<br>`state`: État (boolean)<br>`color`: Couleur (hex)<br>`brightness`: Luminosité (0-100) | Appareil créé           |
| PUT     | `/api/v1/devices/:id` | Mettre à jour un appareil        | `id`: ID de l'appareil<br>+ champs à modifier                                                                                                 | Appareil mis à jour     |
| DELETE  | `/api/v1/devices/:id` | Supprimer un appareil            | `id`: ID de l'appareil                                                                                                                        | Message de confirmation |

### Commands

| Méthode | Endpoint               | Description                       | Paramètres                                                                             | Réponse                 |
| ------- | ---------------------- | --------------------------------- | -------------------------------------------------------------------------------------- | ----------------------- |
| GET     | `/api/v1/commands`     | Récupérer toutes les commandes    | -                                                                                      | Liste des commandes     |
| GET     | `/api/v1/commands/:id` | Récupérer une commande spécifique | `id`: ID de la commande                                                                | Détails de la commande  |
| POST    | `/api/v1/commands`     | Créer une nouvelle commande       | `device`: ID de l'appareil<br>`action`: Objet contenant `action_key` et `action_value` | Commande créée          |
| PUT     | `/api/v1/commands/:id` | Mettre à jour une commande        | `id`: ID de la commande<br>+ champs à modifier                                         | Commande mise à jour    |
| DELETE  | `/api/v1/commands/:id` | Supprimer une commande            | `id`: ID de la commande                                                                | Message de confirmation |

### Traitement de commandes vocales

| Méthode | Endpoint                  | Description                 | Paramètres                   | Réponse                      |
| ------- | ------------------------- | --------------------------- | ---------------------------- | ---------------------------- |
| POST    | `/api/v1/process-command` | Traiter une commande vocale | `text`: Texte de la commande | Commande traitée et formatée |

#### Exemple de requête pour traiter une commande vocale

!!! il faut bien indiquer le bon nom du dispositif et le bon nom de la localisation !!!

```bash
curl -X POST http://localhost:3000/api/v1/process-command \
-H "Content-Type: application/json" \
-d '{
  "text": "Allume la lumière du salon"
}'

```

#### Exemple de réponse

```json
{
  "message": "Commande traitée avec succès",
  "processedCommand": {
    "device": {
      "location": "salon",
      "name": "lumière"
    },
    "action": {
      "action_key": "POWER",
      "action_value": "ON"
    }
  },
  "command": {
    "_id": "60f1a5b3e6b3f32f948e9a7c",
    "device": "60f1a5b3e6b3f32f948e9a7b",
    "action": {
      "action_key": "POWER",
      "action_value": "ON"
    },
    "createdAt": "2023-07-16T12:34:56.789Z",
    "updatedAt": "2023-07-16T12:34:56.789Z"
  }
}
```

## Tests

Tous les tests sont effectués en local. Pour tester l'API, vous pouvez utiliser des outils comme Postman ou curl.
