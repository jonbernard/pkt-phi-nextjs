const fs = require("fs");
const path = require("path");

const sourcePath = path.join(
  __dirname,
  "../backend/types/generated/contentTypes.d.ts"
);
const destinationPath = path.join(
  __dirname,
  "../frontend/src/types/contentTypes.d.ts"
);
const destinationDir = path.dirname(destinationPath);

// Check if source file exists
if (!fs.existsSync(sourcePath)) {
  console.error(`Source file does not exist: ${sourcePath}`);
  process.exit(1);
}

// Ensure destination directory exists or create it
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

// Read the source file, modify its content and write to the destination file
const content = fs.readFileSync(sourcePath, "utf8");
const modifiedContent = content.replace("@strapi/strapi", "@strapi/types");

fs.writeFile(destinationPath, modifiedContent, (err) => {
  if (err) {
    console.error(`Error writing to destination file: ${err}`);
    process.exit(1);
  } else {
    console.log("File copied and modified successfully!");
  }
});


const sourcePath2 = path.join(
  __dirname,
  "../backend/types/generated/components.d.ts"
);
const destinationPath2 = path.join(
  __dirname,
  "../frontend/src/types/components.d.ts"
);
const destinationDir2 = path.dirname(destinationPath);

// Check if source file exists
if (!fs.existsSync(sourcePath2)) {
  console.error(`Source file does not exist: ${sourcePath2}`);
  process.exit(1);
}

// Ensure destination directory exists or create it
if (!fs.existsSync(destinationDir2)) {
  fs.mkdirSync(destinationDir2, { recursive: true });
}

// Read the source file, modify its content and write to the destination file
const content2 = fs.readFileSync(sourcePath2, "utf8");
const modifiedContent2 = content2.replace("@strapi/strapi", "@strapi/types");

fs.writeFile(destinationPath2, modifiedContent2, (err) => {
  if (err) {
    console.error(`Error writing to destination file: ${err}`);
    process.exit(1);
  } else {
    console.log("File copied and modified successfully!");
  }
});