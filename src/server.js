import app from "./app";
import "dotenv/config";
import { startDatabase } from "./database";

export default app.listen(3333, async () => {
  await startDatabase();
  console.log("Server running");
});
