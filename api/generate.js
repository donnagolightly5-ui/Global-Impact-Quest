export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing in Vercel Environment Variables.' });
  }

  try {
    // Calling the stable Gemini 1.5 Flash model
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: {
          parts: [{ text: "You are an inspiring AI Co-Pilot for 10-15 year old students. Keep responses bright, encouraging, and easy to understand. Generate ONLY the 3 inquiry questions requested." }]
        }
      })
    });

    const data = await response.json();
    
    // If Google sends back an error, catch it
    if (data.error) {
      throw new Error(data.error.message);
    }

    return res.status(200).json(data);
    
  } catch (error) {
    console.error("Backend AI Error:", error);
    // Send the EXACT error to the screen so we can see what's wrong
    return res.status(500).json({ error: error.message });
  }
}
