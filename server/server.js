const path = require("path");
const express = require("express");
const session = require("express-session");
const { initDefaultAdmin } = require("./database");
const authRoutes = require("./routes/auth");
const diagnosticsRoutes = require("./routes/diagnostics");
const reportsRoutes = require("./routes/reports");

const app = express();
const port = process.env.PORT || 3000;

initDefaultAdmin();

app.use(express.json({ limit: "1mb" }));
app.use(
  session({
    name: "aura.sid",
    secret: process.env.SESSION_SECRET || "troque-esta-chave-em-producao",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 8
    }
  })
);

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

const server = app.listen(port, () => {
  console.log(`AURA Diagnostico rodando em http://localhost:${port}`);
});

module.exports = {
  app,
  server
};
