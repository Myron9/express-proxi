const { randomUUID } = require("crypto");

const extensions = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/webp": "webp",
  "image/gif": "gif",
};

const tryCatchWrapper = (cb) => {
  return async (...args) => {
    try {
      return await cb(...args);
    } catch (err) {
      console.log(err.message);
    }
  };
};

const getFileNameFromResponse = (response) => {
  const contentType = response.headers.get("Content-Type").replace(/;.*$/, "");
  const extension = extensions[contentType];
  return `${randomUUID()}.${extension}`;
};

module.exports = {
  tryCatchWrapper,
  getFileNameFromResponse,
};
