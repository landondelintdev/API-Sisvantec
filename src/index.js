// src/index.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { firestore } from "./config/firebase.js";
import leaksRoutes from "./routes/leaks.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

//Ahorita checo que tal va esto
app.use("/api", leaksRoutes);

// Ruta de prueba
app.get("/test-firebase", async (req, res) => {
  try {
    const snapshot = await firestore.collection("test").get();
    res.json(snapshot.docs.map((doc) => doc.data()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
