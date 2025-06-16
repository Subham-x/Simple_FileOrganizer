const fs = require("fs");
const path = require("path");

// Default backend exceptions
const DEFAULT_EXCEPTIONS = ["js", "json", "html"];

// Accept directory + userExceptions from frontend
function organizeFiles(targetDir, userExceptions = []) {
  if (!fs.existsSync(targetDir)) {
    console.error("Target directory doesn't exist.");
    return;
  }

  const files = fs.readdirSync(targetDir);
  const combinedExceptions = new Set([...DEFAULT_EXCEPTIONS, ...userExceptions.map(ext => ext.trim().toLowerCase())]);

  console.log("\nOrganizing files from:", targetDir);
  console.log("Exceptions:", [...combinedExceptions].join(", "), "\n");

  for (const file of files) {
    const fullPath = path.join(targetDir, file);
    if (fs.lstatSync(fullPath).isDirectory()) continue;

    const ext = file.split(".").pop().toLowerCase();

    if (combinedExceptions.has(ext)) {
      console.log(`Skipping: ${file}`);
      continue;
    }

    const destDir = path.join(targetDir, ext);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir);
      console.log(`Created directory: ${ext}`);
    }

    const newPath = path.join(destDir, file);
    fs.renameSync(fullPath, newPath);
    console.log(`Moved: ${file} → ${ext}/`);
  }

  console.log("\nOrganization Complete.");
}

// Accept folder + exceptions from CLI call or IPC
if (require.main === module) {
  const args = process.argv.slice(2);
  const folderPath = args[0];
  const additionalExceptions = args[1] ? args[1].split(",") : [];

  if (!folderPath) {
    console.error("No folder path provided.");
    process.exit(1);
  }

  organizeFiles(folderPath, additionalExceptions);
}

module.exports = { organizeFiles };
