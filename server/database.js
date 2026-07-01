const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { DatabaseSync } = require("node:sqlite");
const { buildReportFromDiagnostic, createReportSlug } = require("./reportBuilder");

const dbPath = process.env.DB_PATH || path.join(__dirname, "aura.sqlite");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new DatabaseSync(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS diagnostics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    profissao TEXT NOT NULL,
    cidade TEXT,
    instagram_linkedin TEXT,
    respostas TEXT NOT NULL,
    arquetipo_sugerido TEXT NOT NULL,
    arquetipo_secundario TEXT NOT NULL,
    data_envio TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Novo'
  );

  CREATE INDEX IF NOT EXISTS diagnostics_status_idx ON diagnostics(status);
  CREATE INDEX IF NOT EXISTS diagnostics_nome_idx ON diagnostics(nome);
`);

ensureColumn("diagnostics", "report_slug", "report_slug TEXT");
ensureColumn("diagnostics", "report_data", "report_data TEXT");
ensureColumn("diagnostics", "report_published", "report_published INTEGER NOT NULL DEFAULT 0");
ensureColumn("diagnostics", "report_updated_at", "report_updated_at TEXT");

db.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS diagnostics_report_slug_idx
  ON diagnostics(report_slug)
  WHERE report_slug IS NOT NULL;
`);

function ensureColumn(table, column, definition) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all().map((item) => item.name);

  if (!columns.includes(column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${definition}`);
  }
}

function initDefaultAdmin() {
  const email = process.env.AURA_ADMIN_EMAIL || "admin@aura.com";
  const password = process.env.AURA_ADMIN_PASSWORD || "aura123";
  const existing = db.prepare("SELECT id FROM admins WHERE email = ?").get(email);

  if (!existing) {
    const passwordHash = bcrypt.hashSync(password, 12);
    db.prepare("INSERT INTO admins (email, password_hash) VALUES (?, ?)").run(email, passwordHash);
  }
}

function parseJson(value, fallback) {
  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function rowToDiagnostic(row) {
  if (!row) return null;

  return {
    ...row,
    respostas: parseJson(row.respostas, {}),
    report_data: parseJson(row.report_data, null),
    report_published: Boolean(row.report_published)
  };
}

function migrateExistingReports() {
  const rows = db
    .prepare(
      "SELECT * FROM diagnostics WHERE report_slug IS NULL OR report_data IS NULL OR report_data = ''"
    )
    .all();
  const update = db.prepare(`
    UPDATE diagnostics
    SET report_slug = ?, report_data = ?, report_updated_at = ?
    WHERE id = ?
  `);

  rows.forEach((row) => {
    const respostas = parseJson(row.respostas, {});
    const cadastro = {
      nome: row.nome,
      email: row.email,
      whatsapp: row.whatsapp,
      profissao: row.profissao,
      cidade: row.cidade,
      instagram_linkedin: row.instagram_linkedin
    };
    const reportData = row.report_data
      ? parseJson(row.report_data, null)
      : buildReportFromDiagnostic({
          id: row.id,
          cadastro,
          respostas,
          archetypes: {
            principal: row.arquetipo_sugerido,
            secundario: row.arquetipo_secundario
          },
          dataEnvio: row.data_envio
        });

    update.run(
      row.report_slug || createReportSlug(row.id, row.nome),
      JSON.stringify(reportData),
      new Date().toISOString(),
      row.id
    );
  });
}

migrateExistingReports();

module.exports = {
  db,
  initDefaultAdmin,
  rowToDiagnostic
};
