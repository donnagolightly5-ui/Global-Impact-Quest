module.exports = async (req, res) => {
  try {
    const response = await fetch('https://www.google.com');
    return res.status(200).json({ message: "Vercel can connect to the internet!", status: response.status });
  } catch (error) {
    return res.status(500).json({ error: "Vercel CANNOT connect to the internet: " + error.message });
  }
};
