// fuseHelper.js
const Fuse = require("fuse.js");
const fuseConfig = require("./fuseConfig"); // Import Fuse.js configuration

let fuseInstance = null;

// Initialize Fuse with data and configuration
const initializeFuse = (data) => {
  if (!Array.isArray(data)) {
    throw new Error("Data must be an array.");
  }
  fuseInstance = new Fuse(data, fuseConfig);
  console.log("Fuse.js initialized with data.");
};

// Perform a search
const searchFuse = (query) => {
  if (!fuseInstance) {
    throw new Error("Fuse.js is not initialized. Call initializeFuse() first.");
  }
  return fuseInstance.search(query);
};

module.exports = {
  initializeFuse,
  searchFuse,
};
