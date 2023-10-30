const fs = require("fs").promises;
const path = require("path");

const { tryCatchWrapper } = require("./utils");
const imageObjectPath = path.resolve(__dirname, "imageObject.json");

/**
 * Get image object
 */
const getImageObject = async () => {
  const result = JSON.parse(await fs.readFile(imageObjectPath, "utf-8"));
  if (!result) throw new Error("Image object wasn't found");
  return result;
};

/**
 * Get image links
 */
const getImageLinks = async () => {
  return Object.keys(await getImageObject());
};

/**
 * Is link exists
 */
const isLinkExists = async (link) => {
  const links = await getImageLinks();
  return links.includes(link);
};

/**
 * Add image link
 */
const addImageLink = async (link, filename, filePath, data) => {
  try {
    await fs.writeFile(filePath, data);

    const imageObject = await getImageObject();
    imageObject[link] = filename;

    await fs.writeFile(imageObjectPath, JSON.stringify(imageObject));

    return imageObject;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getImageObject: tryCatchWrapper(getImageObject),
  getImageLinks: tryCatchWrapper(getImageLinks),
  isLinkExists: tryCatchWrapper(isLinkExists),
  addImageLink: tryCatchWrapper(addImageLink),
};
