export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { device, action } = req.body;
  
      if (!device || !action) {
        return res.status(400).json({ message: 'Device et action sont nécessaires.' });
      }
  
      // contrôle de la lampe
      let response = {};
  
      if (action.action_key === 'POWER') {
        // Simulation de l'état de la lampe
        if (action.action_value === 'ON') {
          response = {
            device: device,
            state: true, // La lampe est allumée
            message: 'Lampe allumée'
          };
          console.log(`Lampe ${device} allumée`);
        } else if (action.action_value === 'OFF') {
          response = {
            device: device,
            state: false, // La lampe est éteinte
            message: 'Lampe éteinte'
          };
          console.log(`Lampe ${device} éteinte`);
        } else {
          return res.status(400).json({ message: 'Valeur de l\'action inconnue' });
        }
      } else {
        return res.status(400).json({ message: 'Action inconnue' });
      }
  
      // Réponse
      return res.status(200).json(response);
    } else {
      res.status(405).json({ message: 'Méthode non autorisée' });
    }
  }
  