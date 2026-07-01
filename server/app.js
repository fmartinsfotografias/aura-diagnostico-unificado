const path = require("path");
const express = require("express");
const { ensureReady } = require("./server/database");
const authRoutes = require("./server/routes/auth");
const diagnosticsRoutes = require("./server/routes/diagnostics");
const reportsRoutes = require("./server/routes/reports");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));

app.use(async (req, res, next) => {
  try {
    await ensureReady();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/auth", authRoutes.router);
app.use("/api/diagnostics", diagnosticsRoutes);
app.use("/api/reports", reportsRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("/relatorio/:slug", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "relatorio.html"));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error);
  return res.status(500).json({
    message: "Nao foi possivel processar a solicitacao."
  });
});

const server = app.listen(port, () => {
  console.log(`AURA Diagnostico rodando na porta ${port}`);
});

module.exports = server;
