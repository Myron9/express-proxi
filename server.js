const express = require("express");
const axios = require("axios");
const cors = require("cors");

const path = require("path");

const { getFileNameFromResponse } = require("./utils");
const { isLinkExists, addImageLink, getImageObject } = require("./utilsDB");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const { url } = req.query;
    const alreadyInPublic = await isLinkExists(url);

    if (alreadyInPublic) {
      const imageObj = await getImageObject();
      const fileName = imageObj[url];
      const filePath = path.resolve(__dirname, "public", fileName);
      res.sendFile(filePath);
      return;
    }

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const fileName = getFileNameFromResponse(response);
    const filePath = path.resolve(__dirname, "public", fileName);

    await addImageLink(url, fileName, filePath, response.data);
    res.sendFile(filePath);
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
