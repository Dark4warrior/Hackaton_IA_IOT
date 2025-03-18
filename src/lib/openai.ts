import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function processCommand(text: string) {
  const prompt = `
    Analyse cette commande vocale et extrais les informations principales pour contrôler une lumière connectée.
    Retourne un JSON avec le format suivant:
    {
      "device": {
        "location": "pièce mentionnée",
        "name": "nom de la lumière"
      },
      "action": {
        "action_key": "POWER|COLOR|BRIGHTNESS",
        "action_value": "valeur appropriée"
      }
    }

    si action_key = POWER, action_value = true ou false
    si action_key = COLOR, action_value = couleur avec le format hexadécimal
    si action_key = BRIGHTNESS, action_value = valeur entre 0 et 100 
    
    Commande: "${text}"
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.3,
    });

    const result = completion.choices[0].message.content;
    return JSON.parse(result || '{}');
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    throw error;
  }
} 