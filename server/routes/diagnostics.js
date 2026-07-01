const express = require("express");
const { db, rowToDiagnostic } = require("../database");
const { requireAdmin } = require("./auth");
const { buildReportFromDiagnostic, createReportSlug } = require("../reportBuilder");

const router = express.Router();

const STATUSES = [
  "Novo",
  "Em análise",
  "Briefing criado",
  "Ensaio realizado",
  "Relatório entregue"
];

const ARCHETYPES = [
  "Governante",
  "Sabio",
  "Cuidador",
  "Heroi",
  "Amante",
  "Criador",
  "Explorador",
  "Bobo da Corte",
  "Pessoa Comum",
  "Mago",
  "Rebelde",
  "Inocente"
];

const WORD_SCORES = {
  Autoridade: { Governante: 2, Sabio: 1 },
  Lideranca: { Governante: 2 },
  Seguranca: { Governante: 1, Sabio: 1 },
  Clareza: { Sabio: 2 },
  Experiencia: { Sabio: 1, Governante: 1 },
  Acolhimento: { Cuidador: 2 },
  Cuidado: { Cuidador: 2 },
  Humanidade: { Cuidador: 1, "Pessoa Comum": 1 },
  Forca: { Heroi: 2 },
  Resultado: { Heroi: 2 },
  Inspiracao: { Heroi: 1, Mago: 1 },
  Sofisticacao: { Amante: 2, Governante: 1 },
  Elegancia: { Amante: 1, Governante: 1 },
  Exclusividade: { Amante: 1, Governante: 1 },
  Criatividade: { Criador: 2 },
  Modernidade: { Criador: 1, Mago: 1 },
  Energia: { "Bobo da Corte": 1, Heroi: 1 },
  Proximidade: { "Pessoa Comum": 2, Cuidador: 1 },
  Leveza: { Inocente: 1, "Bobo da Corte": 1 },
  Confianca: { Governante: 1, Cuidador: 1, Sabio: 1 }
};

const WORD_ALIASES = {
  "Autoridade": "Autoridade",
  "Liderança": "Lideranca",
  "Segurança": "Seguranca",
  "Clareza": "Clareza",
  "Experiência": "Experiencia",
  "Acolhimento": "Acolhimento",
  "Cuidado": "Cuidado",
  "Humanidade": "Humanidade",
  "Força": "Forca",
  "Resultado": "Resultado",
  "Inspiração": "Inspiracao",
  "Sofisticação": "Sofisticacao",
  "Elegância": "Elegancia",
  "Exclusividade": "Exclusividade",
  "Criatividade": "Criatividade",
  "Modernidade": "Modernidade",
  "Energia": "Energia",
  "Proximidade": "Proximidade",
  "Leveza": "Leveza",
  "Confiança": "Confianca"
};

const ARCHETYPE_ALIASES = {
  "Sábio": "Sabio",
  "Herói": "Heroi",
  "Governante": "Governante",
  "Sabio": "Sabio",
  "Cuidador": "Cuidador",
  "Heroi": "Heroi",
  "Amante": "Amante",
  "Criador": "Criador",
  "Explorador": "Explorador",
  "Bobo da Corte": "Bobo da Corte",
  "Pessoa Comum": "Pessoa Comum",
  "Mago": "Mago",
  "Rebelde": "Rebelde",
  "Inocente": "Inocente"
};

const ARCHETYPE_LABELS = {
  Governante: "Governante",
  Sabio: "Sábio",
  Cuidador: "Cuidador",
  Heroi: "Herói",
  Amante: "Amante",
  Criador: "Criador",
  Explorador: "Explorador",
  "Bobo da Corte": "Bobo da Corte",
  "Pessoa Comum": "Pessoa Comum",
  Mago: "Mago",
  Rebelde: "Rebelde",
  Inocente: "Inocente"
};

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return [];
}

function calculateArchetypes(respostas) {
  const scores = Object.fromEntries(ARCHETYPES.map((name) => [name, 0]));
  const chosenWords = asArray(respostas?.percepcao?.palavras_percepcao);
  const directChoice = ARCHETYPE_ALIASES[respostas?.arquetipo_visual?.energia_visual] || null;

  chosenWords.forEach((word) => {
    const key = WORD_ALIASES[word] || word;
    const scoreMap = WORD_SCORES[key];

    if (!scoreMap) return;

    Object.entries(scoreMap).forEach(([archetype, points]) => {
      scores[archetype] += points;
    });
  });

  if (directChoice && scores[directChoice] !== undefined) {
    scores[directChoice] += 5;
  }

  const ordered = ARCHETYPES.map((name) => ({ name, score: scores[name] })).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.name === directChoice) return -1;
    if (b.name === directChoice) return 1;
    return ARCHETYPES.indexOf(a.name) - ARCHETYPES.indexOf(b.name);
  });

  return {
    principal:
      ordered[0]?.score > 0
        ? ARCHETYPE_LABELS[ordered[0].name]
        : ARCHETYPE_LABELS[directChoice] || "Não definido",
    secundario:
      ARCHETYPE_LABELS[ordered.find((item) => item.name !== ordered[0]?.name)?.name] ||
      "Não definido",
    scores
  };
}

function validateSubmission(body) {
  const respostas = body?.respostas || {};
  const cadastro = body?.cadastro || respostas.cadastro || {};
  const missing = ["nome", "email"].filter((field) => {
    return !String(cadastro[field] || "").trim();
  });

  if (missing.length) {
    return { ok: false, message: "Preencha nome e e-mail." };
  }

  if (!/^\S+@\S+\.\S+$/.test(String(cadastro.email).trim())) {
    return { ok: false, message: "Informe um e-mail valido." };
  }

  const normalizedCadastro = {
    nome: String(cadastro.nome || "").trim(),
    email: String(cadastro.email || "").trim(),
    whatsapp: String(cadastro.whatsapp || "").trim(),
    profissao: String(cadastro.profissao || "").trim(),
    cidade: String(cadastro.cidade || "").trim(),
    instagram_linkedin: String(cadastro.instagram_linkedin || "").trim()
  };

  return { ok: true, cadastro: normalizedCadastro, respostas: { ...respostas, cadastro: normalizedCadastro } };
}

router.post("/", (req, res) => {
  const validation = validateSubmission(req.body);

  if (!validation.ok) {
    return res.status(400).json({ message: validation.message });
  }

  const { cadastro, respostas } = validation;
  const archetypes = calculateArchetypes(respostas);
  const now = new Date().toISOString();

  const result = db
    .prepare(`
      INSERT INTO diagnostics (
        nome, email, whatsapp, profissao, cidade, instagram_linkedin,
        respostas, arquetipo_sugerido, arquetipo_secundario, data_envio, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      cadastro.nome,
      cadastro.email,
      cadastro.whatsapp,
      cadastro.profissao,
      cadastro.cidade,
      cadastro.instagram_linkedin,
      JSON.stringify(respostas),
      archetypes.principal,
      archetypes.secundario,
      now,
      "Novo"
    );

  const id = Number(result.lastInsertRowid);
  const reportSlug = createReportSlug(id, cadastro.nome);
  const reportData = buildReportFromDiagnostic({
    id,
    cadastro,
    respostas,
    archetypes,
    dataEnvio: now
  });

  db.prepare(`
    UPDATE diagnostics
    SET report_slug = ?, report_data = ?, report_updated_at = ?
    WHERE id = ?
  `).run(reportSlug, JSON.stringify(reportData), now, id);

  return res.status(201).json({
    id,
    arquetipo_sugerido: archetypes.principal,
    arquetipo_secundario: archetypes.secundario,
    report_slug: reportSlug,
    report_url: `/relatorio/${reportSlug}`
  });
});

router.get("/", requireAdmin, (req, res) => {
  const rows = db
    .prepare(`
      SELECT id, nome, email, whatsapp, profissao, cidade, instagram_linkedin,
             arquetipo_sugerido, arquetipo_secundario, data_envio, status,
             report_slug, report_published, report_updated_at
      FROM diagnostics
      ORDER BY datetime(data_envio) DESC
    `)
    .all();

  res.json(rows);
});

router.get("/stats", requireAdmin, (req, res) => {
  const grouped = db
    .prepare("SELECT status, COUNT(*) AS total FROM diagnostics GROUP BY status")
    .all();
  const stats = Object.fromEntries(STATUSES.map((status) => [status, 0]));

  grouped.forEach((row) => {
    stats[row.status] = row.total;
  });

  const total = db.prepare("SELECT COUNT(*) AS total FROM diagnostics").get().total;

  res.json({ total, byStatus: stats });
});

router.get("/:id", requireAdmin, (req, res) => {
  const row = db.prepare("SELECT * FROM diagnostics WHERE id = ?").get(req.params.id);
  const diagnostic = rowToDiagnostic(row);

  if (!diagnostic) {
    return res.status(404).json({ message: "Diagnostico nao encontrado." });
  }

  return res.json(diagnostic);
});

router.patch("/:id/status", requireAdmin, (req, res) => {
  const { status } = req.body || {};

  if (!STATUSES.includes(status)) {
    return res.status(400).json({ message: "Status invalido." });
  }

  const result = db
    .prepare("UPDATE diagnostics SET status = ? WHERE id = ?")
    .run(status, req.params.id);

  if (!result.changes) {
    return res.status(404).json({ message: "Diagnostico nao encontrado." });
  }

  return res.json({ ok: true, status });
});

router.patch("/:id/report", requireAdmin, (req, res) => {
  const { reportData, published } = req.body || {};

  if (!reportData || typeof reportData !== "object" || Array.isArray(reportData)) {
    return res.status(400).json({ message: "Informe um JSON valido para o relatorio." });
  }

  const row = db.prepare("SELECT * FROM diagnostics WHERE id = ?").get(req.params.id);

  if (!row) {
    return res.status(404).json({ message: "Diagnostico nao encontrado." });
  }

  const reportSlug = row.report_slug || createReportSlug(row.id, row.nome);
  const reportPublished =
    typeof published === "boolean" ? Number(published) : Number(row.report_published || 0);
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE diagnostics
    SET report_slug = ?, report_data = ?, report_published = ?, report_updated_at = ?
    WHERE id = ?
  `).run(reportSlug, JSON.stringify(reportData), reportPublished, now, row.id);

  const updated = db.prepare("SELECT * FROM diagnostics WHERE id = ?").get(row.id);
  return res.json(rowToDiagnostic(updated));
});

router.post("/:id/report/regenerate", requireAdmin, (req, res) => {
  const row = db.prepare("SELECT * FROM diagnostics WHERE id = ?").get(req.params.id);

  if (!row) {
    return res.status(404).json({ message: "Diagnostico nao encontrado." });
  }

  const diagnostic = rowToDiagnostic(row);
  const cadastro = {
    nome: diagnostic.nome,
    email: diagnostic.email,
    whatsapp: diagnostic.whatsapp,
    profissao: diagnostic.profissao,
    cidade: diagnostic.cidade,
    instagram_linkedin: diagnostic.instagram_linkedin
  };
  const reportData = buildReportFromDiagnostic({
    id: diagnostic.id,
    cadastro,
    respostas: diagnostic.respostas,
    archetypes: {
      principal: diagnostic.arquetipo_sugerido,
      secundario: diagnostic.arquetipo_secundario
    },
    dataEnvio: diagnostic.data_envio
  });
  const reportSlug = diagnostic.report_slug || createReportSlug(diagnostic.id, diagnostic.nome);
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE diagnostics
    SET report_slug = ?, report_data = ?, report_updated_at = ?
    WHERE id = ?
  `).run(reportSlug, JSON.stringify(reportData), now, diagnostic.id);

  const updated = db.prepare("SELECT * FROM diagnostics WHERE id = ?").get(diagnostic.id);
  return res.json(rowToDiagnostic(updated));
});

router.delete("/:id", requireAdmin, (req, res) => {
  const result = db.prepare("DELETE FROM diagnostics WHERE id = ?").run(req.params.id);

  if (!result.changes) {
    return res.status(404).json({ message: "Diagnostico nao encontrado." });
  }

  return res.json({ ok: true });
});

module.exports = router;
