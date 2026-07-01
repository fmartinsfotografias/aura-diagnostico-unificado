const express = require("express");
const { db } = require("../database");

const router = express.Router();

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

router.get("/:slug", (req, res) => {
  const row = db
    .prepare(
      `SELECT id, nome, report_slug, report_data, report_published, report_updated_at
       FROM diagnostics
       WHERE report_slug = ?`
    )
    .get(req.params.slug);

  if (!row) {
    return res.status(404).json({ message: "Relatorio nao encontrado." });
  }

  const isAdmin = Boolean(req.session?.admin);

  if (!row.report_published && !isAdmin) {
    return res.status(403).json({
      message: "Este relatorio ainda nao foi publicado pelo AURA Fotografia."
    });
  }

  const report = parseJson(row.report_data);

  if (!report) {
    return res.status(404).json({ message: "Relatorio ainda nao foi gerado." });
  }

  return res.json({
    report,
    meta: {
      id: row.id,
      nome: row.nome,
      slug: row.report_slug,
      published: Boolean(row.report_published),
      updatedAt: row.report_updated_at,
      preview: isAdmin && !row.report_published
    }
  });
});

module.exports = router;
