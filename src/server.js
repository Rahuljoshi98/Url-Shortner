import { connectDB } from "./config/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 3002;

connectDB()
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
