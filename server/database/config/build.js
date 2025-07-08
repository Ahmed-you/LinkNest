import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import connection from "./connection.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const build_db = () => {
  const sql = readFileSync(join(__dirname, "build.sql")).toString();
  return connection
    .query(sql)
    .then(() => console.log("build created successfully!"))
    .catch((err) => console.error(err));
};

export default build_db;
