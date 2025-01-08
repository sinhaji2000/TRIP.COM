// Fuse.js Configuration
const fuseConfig = {
  keys: ["tripTitle"],
  threshold: 0.3, // Controls fuzzy matching (lower = stricter matches)
  includeScore: true, // Include search score in results
  includeMatches: true, // Include matching details in results
  minMatchCharLength: 2, // Minimum characters required to match
};

module.exports = fuseConfig;
