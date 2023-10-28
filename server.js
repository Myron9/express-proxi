const express = require("express");
const axios = require("axios");
const app = express();
const port = 4000;

app.get("/image", async (req, res) => {
  try {
    const { link } = req.query;
    const response = await axios.get(link, { responseType: "arraybuffer" });
    res.setHeader("Content-Type", response.headers.get("Content-Type"));
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(response.data);
  } catch {
    res.status(400).send("Bad request");
  }
});

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, _, res, __) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
