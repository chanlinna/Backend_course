import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "hello.txt");

// Write to a file (synchronously)
try {
fs.writeFileSync(filePath, "Hello, Node.js beginner!", "utf8");
}
catch (err) {
    console.error("Error writing to file:", err);
}
// Read the file (synchronously)
try {
const content = fs.readFileSync(filePath, "utf8");
console.log("File content:", content);
}
catch (err) {
    console.error("Error reading file:", err);
}