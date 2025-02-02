import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

// import dalleRoutes from "./routes/ai.routes.js";
import router from "./routes/ai.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/ai", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E" });
});

app.listen(PORT, () => console.log("Server has started", PORT));
