import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes"; // ✅ ruta relativa correcta



const app = express();

// Middleware
app.use(express.json());

// Conexión a Mongo Atlas
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Conectado a Mongo Atlas"))
  .catch((err) => console.error("Error al conectar a Mongo Atlas:", err));

// Rutas principales
app.use("/api/auth", authRoutes); // ✅ Prefijo correcto

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente");
});

// Middleware de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

