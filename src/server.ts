import express from "express";
import cors from"cors";

const PORT = process.env.PORT || 4000
const HOSTNAME = process.env.HOSTNAME || "http://localhost"

const app = express();

app.get("/", (req, res) => {
  return res.send("Teste API executado com sucesso");
});

// Cors
app.use(cors({
  origin: ["http://localhost:3000"]
}))

app.use((req, res) => {
  res.status(404);
})

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
});
