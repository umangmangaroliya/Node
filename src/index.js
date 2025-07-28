import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db/connection.js";
import logger from "./utils/logger.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.info(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error("MONGODB connection FAILED ", err);
    process.exit(1);
  });
