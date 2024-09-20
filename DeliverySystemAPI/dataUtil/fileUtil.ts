const fs = require("fs").promises;
import path from "path";

// Helper function to get the full path of the JSON file
const getJsonFilePath = (fileName: string) =>
  path.join(__dirname, "..", "data", `${fileName}.json`);
// Function to read a JSON file (generic, works for any file)
export const readJsonFile = async (fileName: string) => {
  try {
    const filePath = getJsonFilePath(fileName);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    throw err;
  }
};

// Function to write data to a JSON file (generic, works for any file)
export const writeJsonFile = async (fileName: string, data: any[]) => {
  try {
    const filePath = getJsonFilePath(fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing to ${fileName}:`, err);
    throw err;
  }
};
