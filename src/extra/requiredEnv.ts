import "../services/dotenv.js";

export default function requiredEnv(key: string) {
  const value = process.env[key];

  if (!value) {
    throw Error(`Provide ${key}`);
  }
  return value;
}
