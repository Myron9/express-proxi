const express = require("express");
const axios = require("axios");
const cors = require("cors");

const path = require("node:path");
const { presentedImgs, getImg4Keys } = require("./config");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.static("public"));

app.get("/image", async (req, res) => {
  try {
    const { link } = req.query;
    if (presentedImgs.includes(link)) {
      const filePath = path.resolve(__dirname, "public", getImg4Keys[link]);
      res.sendFile(filePath);
      return;
    }
    const response = await axios.get(link, { responseType: "arraybuffer" });
    res.setHeader("Content-Type", response.headers.get("Content-Type"));
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
