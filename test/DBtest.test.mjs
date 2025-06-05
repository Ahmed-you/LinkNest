import connection from "../server/database/config/connection.js";
import build_db from "../server/database/config/build.js";

test("jest is working", () => {
  expect(1).toBe(1);
});

beforeAll(() => {
  return build_db(); // rebuild test DB before tests
});

afterAll(() => {
  return connection.end(); // close DB connection after tests
});
