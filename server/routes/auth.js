const express = require("express");
const bcrypt = require("bcryptjs");
const { db } = require("../database");

const router = express.Router();

function requireAdmin(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  }

  return res.status(401).json({ message: "Login necessario." });
}

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Informe e-mail e senha." });
  }

  const admin = db
    .prepare("SELECT id, email, password_hash FROM admins WHERE lower(email) = lower(?)")
    .get(String(email).trim());

  if (!admin || !bcrypt.compareSync(String(password), admin.password_hash)) {
    return res.status(401).json({ message: "Credenciais invalidas." });
  }

  req.session.regenerate((error) => {
    if (error) {
      return res.status(500).json({ message: "Nao foi possivel iniciar a sessao." });
    }

    req.session.admin = { id: admin.id, email: admin.email };
    return res.json({ admin: req.session.admin });
  });
});

router.get("/me", requireAdmin, (req, res) => {
  res.json({ admin: req.session.admin });
});

router.post("/logout", requireAdmin, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("aura.sid");
    res.json({ ok: true });
  });
});

module.exports = {
  router,
  requireAdmin
};
