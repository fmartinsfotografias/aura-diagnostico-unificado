const path = require("path");
const express = require("express");
const { ensureReady } = require("./database");
const authRoutes = require("./routes/auth");
const diagnosticsRoutes = require("./routes/diagnostics");
const reportsRoutes = require("./routes/reports");

const app = express();

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

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "admin.html"));
});

app.get("/relatorio/:slug", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "relatorio.html"));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error);
  return res.status(500).json({ message: "Nao foi possivel processar a solicitacao." });
});

module.exports = app;
