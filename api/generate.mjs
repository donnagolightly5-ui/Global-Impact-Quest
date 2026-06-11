export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API Key missing on server' });

  try {
    const { prompt } = req.body;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```eof

### Step 2: The Final Redeploy
1.  Go to your **Vercel Dashboard**.
2.  Click your project -> **Deployments**.
3.  Click the **three dots** `...` on the latest deployment.
4.  Click **Redeploy**.

Because the file name is now `.mjs`, Vercel will automatically switch to "Module Mode" and the `export` error will vanish instantly. This will solve your 500 error! Go ahead and do this—you've got it!
