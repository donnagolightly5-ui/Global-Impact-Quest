export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "DEBUG: API_KEY_NOT_FOUND" });
  }

  // If we reach here, Vercel *does* see the key.
  return res.status(200).json({ status: "API_KEY_FOUND_SUCCESS" });
}
```eof

### Step 2: The "Detective" Step (Crucial)
1. Commit and **Redeploy** this file.
2. Open your live website.
3. Click any button in the game.

**What happens?**
*   **If you see "API_KEY_FOUND_SUCCESS":** Then the key is fine, and we know the problem was the Google endpoint/URL.
*   **If you see "DEBUG: API_KEY_NOT_FOUND":** Then your Environment Variable settings in Vercel **are not linking** to your project. 
*   **If you see the 500 error box again:** Then Vercel is blocking the `api/` folder entirely.

### Step 3: Finding the Actual Error Log
You asked how to fix the 500 error—the answer is hidden in the **Logs**. Here is how to find the text I need:

1.  In your Vercel Dashboard, click **your project**.
2.  On the top menu, look for the **Logs** tab.
3.  **Click it.**
4.  Now, go to your live website and click a button to trigger that 500 error.
5.  **Switch back to the Vercel Logs tab immediately.**
6.  You will see a line of text appear (it might be grey or red). **Copy and paste exactly what that line says here.**

If you can give me that line, I can tell you in 5 seconds whether it's a Vercel routing issue, a key permission issue, or a network issue. Let's catch this error!
