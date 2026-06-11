export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    console.error("DEBUG: API Key is missing or empty.");
    return res.status(500).json({ error: 'API Key not configured.' });
  }

  try {
    const { prompt } = req.body;
    // Using v1beta for model compatibility
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("DEBUG: Google API Error:", JSON.stringify(data.error));
      return res.status(500).json({ error: data.error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error("DEBUG: Fetch/Network Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
```eof

### 3. The Front-End (`index.html`)
Use this version. I have simplified the error reporting so it shows the **exact** message from Google on your screen.

index.html

### Final "Last Ditch" Debugging:
Once you redeploy and try again, if it still gives an error, **look at the Vercel Logs tab one more time.** 

Because of the `console.error` lines I added above, you will see one of three things:
1.  **"DEBUG: API Key is missing"** -> Your Environment Variable isn't being read by Vercel.
2.  **"DEBUG: Google API Error"** -> The key is valid, but Google has a message (like "Quota exceeded" or "Permission denied").
3.  **"DEBUG: Fetch/Network Error"** -> The server can't reach the internet.

**What does the Vercel Log say *after* you redeploy with this new code?** The answer is in that specific log message!
