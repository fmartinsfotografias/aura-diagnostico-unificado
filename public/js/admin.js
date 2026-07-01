const STATUSES = ["Novo", "Em análise", "Briefing criado", "Ensaio realizado", "Relatório entregue"];

const energyLabels = {
  Governante: "Governante - Autoridade, comando, presença, elegância, liderança.",
  "Sábio": "Sábio - Conhecimento, clareza, profundidade, técnica, orientação.",
  Sabio: "Sábio - Conhecimento, clareza, profundidade, técnica, orientação.",
  Cuidador: "Cuidador - Cuidado, empatia, acolhimento, proteção, escuta.",
  "Herói": "Herói - Transformação, confiança, evolução, conquista, superação.",
  Heroi: "Herói - Transformação, confiança, evolução, conquista, superação.",
  Amante: "Amante - Beleza, sensibilidade, desejo, conexão, sofisticação.",
  Criador: "Criador - Criatividade, originalidade, expressão, estética, inovação.",
  Explorador: "Explorador - Liberdade, movimento, descoberta, autenticidade, independência.",
  "Bobo da Corte": "Bobo da Corte - Carisma, leveza, espontaneidade, humor, energia social.",
  "Pessoa Comum": "Pessoa Comum - Simplicidade, proximidade, verdade, acessibilidade, conexão real.",
  Mago: "Mago - Visão, magnetismo, transformação, desejo, encantamento.",
  Rebelde: "Rebelde - Ruptura, atitude, coragem, provocação, diferenciação.",
  Inocente: "Inocente - Pureza, leveza, otimismo, transparência, simplicidade."
};

const archetypeLabels = {
  Sabio: "Sábio",
  Heroi: "Herói",
  "Nao definido": "Não definido"
};

const responseBlocks = [
  {
    id: "cadastro",
    title: "Cadastro",
    fields: [
      ["nome", "Nome completo"],
      ["email", "E-mail"]
    ]
  },
  {
    id: "identidade",
    title: "Identidade profissional",
    fields: [
      ["area_atuacao", "Área de atuação"],
      ["principal_venda", "Serviço ou produto que deseja vender"],
      ["cliente_atual", "Quem contrata hoje"],
      ["cliente_desejado", "Quem deseja atrair"],
      ["faixa_cliente", "Faixa de cliente desejada"],
      ["resumo_trabalho", "Resumo do trabalho"]
    ]
  },
  {
    id: "momento",
    title: "Momento atual",
    fields: [
      ["imagem_atual", "Imagem profissional hoje"],
      ["incomodos_imagem", "Incômodos com a imagem atual"],
      ["mudancas_desejadas", "Mudanças desejadas"],
      ["percepcao_antiga", "Percepção antiga a deixar para trás"]
    ]
  },
  {
    id: "reposicionamento",
    title: "Objetivo de reposicionamento",
    fields: [
      ["como_deseja_ser_percebida", "Como deseja ser percebida ou percebido"],
      ["nivel_cliente_desejado", "Nível de cliente desejado"],
      ["valor_posicionamento", "Valor ou posicionamento a sustentar"],
      ["mensagem_antes_falar", "Mensagem antes de falar"]
    ]
  },
  {
    id: "cliente_ideal",
    title: "Cliente ideal",
    fields: [
      ["cliente_ideal", "Cliente que deseja atrair"],
      ["cliente_valoriza", "O que o cliente valoriza"],
      ["medos_cliente", "Medos do cliente"],
      ["transmitir_diminuir_medo", "O que a imagem precisa transmitir"]
    ]
  },
  {
    id: "percepcao",
    title: "Percepção desejada",
    fields: [
      ["palavras_percepcao", "Palavras escolhidas"],
      ["percepcao_descricao", "Como deseja ser percebida ou percebido"]
    ]
  },
  {
    id: "personalidade",
    title: "Personalidade profissional",
    fields: [
      ["tracos_profissionais", "Traços profissionais"],
      ["descricao_clientes", "Como clientes descrevem"],
      ["frase_trabalho", "Frase que combina com a forma de trabalhar"]
    ]
  },
  {
    id: "arquetipo_visual",
    title: "Arquétipo visual",
    fields: [["energia_visual", "Energia escolhida"]]
  },
  {
    id: "imagem_evitar",
    title: "Imagem a evitar",
    fields: [
      ["evitar_transmitir", "O que não quer transmitir"],
      ["estilo_nao_gosta", "Estilo de foto que não gosta"],
      ["sente_imagem_atual", "O que sente ao ver a imagem atual"]
    ]
  },
  {
    id: "estilo_visual",
    title: "Estilo visual",
    fields: [
      ["estilo_visual", "Estilo desejado"],
      ["cores_usa", "Cores que costuma usar"],
      ["cores_evitar", "Cores que evita"],
      ["preferencia_fotos", "Preferência de fundo"]
    ]
  },
  {
    id: "aplicacao",
    title: "Aplicação das imagens",
    fields: [
      ["uso_fotos", "Onde pretende usar"],
      ["foto_precisa", "Fotos mais importantes"]
    ]
  },
  {
    id: "frases",
    title: "Frases de posicionamento",
    fields: [
      ["lembrada_como", "Eu quero ser lembrada ou lembrado como"],
      ["cliente_deve_sentir", "Meu cliente deve sentir"],
      ["imagem_precisa_comunicar", "Minha imagem precisa comunicar"]
    ]
  }
];

const state = {
  diagnostics: [],
  stats: null,
  selected: null
};

const loginView = document.querySelector("#loginView");
const dashboardView = document.querySelector("#dashboardView");
const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const logoutButton = document.querySelector("#logoutButton");
const statsGrid = document.querySelector("#statsGrid");
const tableBody = document.querySelector("#diagnosticsTableBody");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const statusFilter = document.querySelector("#statusFilter");
const refreshButton = document.querySelector("#refreshButton");
const detailPanel = document.querySelector("#detailPanel");
const detailTitle = document.querySelector("#detailTitle");
const detailSubtitle = document.querySelector("#detailSubtitle");
const detailContent = document.querySelector("#detailContent");
const closeDetailButton = document.querySelector("#closeDetailButton");
const detailStatus = document.querySelector("#detailStatus");
const openReportButton = document.querySelector("#openReportButton");
const copyReportLinkButton = document.querySelector("#copyReportLinkButton");
const saveReportButton = document.querySelector("#saveReportButton");
const regenerateReportButton = document.querySelector("#regenerateReportButton");
const togglePublishReportButton = document.querySelector("#togglePublishReportButton");
const copyGptPromptButton = document.querySelector("#copyGptPromptButton");
const importGptReportButton = document.querySelector("#importGptReportButton");
const copyBriefingButton = document.querySelector("#copyBriefingButton");
const downloadTxtButton = document.querySelector("#downloadTxtButton");
const downloadJsonButton = document.querySelector("#downloadJsonButton");
const deleteDiagnosticButton = document.querySelector("#deleteDiagnosticButton");
const toast = document.querySelector("#toast");

populateStatusOptions();
checkSession();

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginMessage.textContent = "";

  const formData = new FormData(loginForm);

  try {
    await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    });
    await showDashboard();
  } catch (error) {
    loginMessage.textContent = error.message;
  }
});

logoutButton.addEventListener("click", async () => {
  await api("/api/auth/logout", { method: "POST" }).catch(() => {});
  showLogin();
});

[searchInput, statusFilter].forEach((input) => {
  input.addEventListener("input", renderDiagnostics);
});

refreshButton.addEventListener("click", loadDashboard);
closeDetailButton.addEventListener("click", closeDetail);
detailPanel.addEventListener("click", (event) => {
  if (event.target === detailPanel) closeDetail();
});

detailStatus.addEventListener("change", async () => {
  if (!state.selected) return;

  const data = await api(`/api/diagnostics/${state.selected.id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status: detailStatus.value })
  });

  state.selected.status = data.status;
  showToast("Status atualizado.");
  await loadDashboard();
});

openReportButton.addEventListener("click", () => {
  if (!state.selected?.report_slug) return;
  window.open(getReportLink(state.selected), "_blank", "noopener");
});

copyReportLinkButton.addEventListener("click", async () => {
  if (!state.selected?.report_slug) return;

  await copyText(getReportLink(state.selected));
  showToast("Link do relatório copiado.");
});

saveReportButton.addEventListener("click", async () => {
  await saveSelectedReport();
});

regenerateReportButton.addEventListener("click", async () => {
  if (!state.selected) return;
  const confirmed = window.confirm(
    "Regenerar o relatório a partir das respostas do diagnóstico? Edições manuais no JSON serão substituídas."
  );

  if (!confirmed) return;

  const updated = await api(`/api/diagnostics/${state.selected.id}/report/regenerate`, {
    method: "POST"
  });
  state.selected = updated;
  renderDetail(updated);
  showToast("Relatório regenerado.");
  await loadDashboard();
});

togglePublishReportButton.addEventListener("click", async () => {
  if (!state.selected) return;
  await saveSelectedReport(!state.selected.report_published);
});

copyGptPromptButton.addEventListener("click", async () => {
  if (!state.selected) return;

  await copyText(buildGptReportPrompt(state.selected));
  showToast("Prompt para GPT copiado.");
});

importGptReportButton.addEventListener("click", () => {
  if (!state.selected) return;
  importGptReportResponse();
});

copyBriefingButton.addEventListener("click", async () => {
  if (!state.selected) return;

  await copyText(buildBriefing(state.selected));
  showToast("Briefing copiado.");
});

downloadTxtButton.addEventListener("click", () => {
  if (!state.selected) return;

  downloadFile(
    `briefing-aura-${slug(state.selected.nome)}.txt`,
    buildBriefing(state.selected),
    "text/plain;charset=utf-8"
  );
});

downloadJsonButton.addEventListener("click", () => {
  if (!state.selected) return;

  downloadFile(
    `diagnostico-aura-${slug(state.selected.nome)}.json`,
    JSON.stringify(state.selected, null, 2),
    "application/json;charset=utf-8"
  );
});

deleteDiagnosticButton.addEventListener("click", async () => {
  if (!state.selected) return;
  const confirmed = window.confirm(`Excluir o diagnóstico de ${state.selected.nome}?`);

  if (!confirmed) return;

  await api(`/api/diagnostics/${state.selected.id}`, { method: "DELETE" });
  closeDetail();
  showToast("Diagnóstico excluído.");
  await loadDashboard();
});

tableBody.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-view-id]");
  if (!button) return;

  await openDetail(button.dataset.viewId);
});

async function checkSession() {
  try {
    await api("/api/auth/me");
    await showDashboard();
  } catch {
    showLogin();
  }
}

function showLogin() {
  loginView.hidden = false;
  dashboardView.hidden = true;
  closeDetail();
}

async function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  await loadDashboard();
}

async function loadDashboard() {
  const [diagnostics, stats] = await Promise.all([
    api("/api/diagnostics"),
    api("/api/diagnostics/stats")
  ]);

  state.diagnostics = diagnostics;
  state.stats = stats;
  renderStats();
  renderDiagnostics();
}

function renderStats() {
  const byStatus = state.stats?.byStatus || {};
  const cards = [
    ["Total de diagnósticos", state.stats?.total || 0],
    ["Novos", byStatus["Novo"] || 0],
    ["Em análise", byStatus["Em análise"] || 0],
    ["Briefing criado", byStatus["Briefing criado"] || 0],
    ["Relatório entregue", byStatus["Relatório entregue"] || 0]
  ];

  statsGrid.innerHTML = cards
    .map(
      ([label, value]) => `
        <article class="stat-card">
          <span>${escapeHtml(label)}</span>
          <strong>${value}</strong>
        </article>
      `
    )
    .join("");
}

function renderDiagnostics() {
  const search = normalize(searchInput.value);
  const status = statusFilter.value;
  const filtered = state.diagnostics.filter((item) => {
    const matchesSearch =
      !search || normalize(item.nome).includes(search) || normalize(item.email).includes(search);
    const matchesStatus = !status || item.status === status;
    return matchesSearch && matchesStatus;
  });

  tableBody.innerHTML = filtered
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.nome)}</td>
          <td>${escapeHtml(item.email)}</td>
          <td>${escapeHtml(formatDate(item.data_envio))}</td>
          <td><span class="status-pill">${escapeHtml(item.status)}</span></td>
          <td>
            <button class="secondary-button" type="button" data-view-id="${item.id}">
              Ver diagnóstico
            </button>
          </td>
        </tr>
      `
    )
    .join("");

  emptyState.hidden = filtered.length > 0;
}

async function openDetail(id) {
  const diagnostic = await api(`/api/diagnostics/${id}`);
  state.selected = diagnostic;
  renderDetail(diagnostic);
  detailPanel.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  detailPanel.hidden = true;
  document.body.style.overflow = "";
  state.selected = null;
}

function renderDetail(diagnostic) {
  const respostas = diagnostic.respostas || {};
  const desiredWords = get(respostas, "percepcao.palavras_percepcao");
  const avoid = get(respostas, "imagem_evitar.evitar_transmitir");
  const style = get(respostas, "estilo_visual.estilo_visual");
  const usage = get(respostas, "aplicacao.uso_fotos");

  detailTitle.textContent = diagnostic.nome;
  detailSubtitle.textContent = `#${diagnostic.id} · ${formatDate(diagnostic.data_envio)}`;
  detailStatus.value = diagnostic.status;
  updateReportButtons(diagnostic);

  detailContent.innerHTML = `
    <section class="detail-section">
      <h3>Dados da cliente</h3>
      <div class="detail-grid">
        ${detailItem("Nome", diagnostic.nome)}
        ${detailItem("E-mail", diagnostic.email)}
        ${optionalDetailItem("Profissão", diagnostic.profissao)}
        ${optionalDetailItem("Cidade", diagnostic.cidade)}
        ${optionalDetailItem("Instagram ou LinkedIn", diagnostic.instagram_linkedin)}
        ${optionalDetailItem("WhatsApp", diagnostic.whatsapp)}
      </div>
    </section>

    <section class="detail-section">
      <h3>Arquétipo visual</h3>
      <div class="detail-grid">
        ${detailItem("Arquétipo sugerido", displayArchetype(diagnostic.arquetipo_sugerido))}
        ${detailItem("Arquétipo secundário", displayArchetype(diagnostic.arquetipo_secundario))}
        ${detailItem("Energia escolhida", energyLabels[get(respostas, "arquetipo_visual.energia_visual")] || get(respostas, "arquetipo_visual.energia_visual"))}
      </div>
    </section>

    <section class="detail-section">
      <h3>Relatório premium</h3>
      <div class="detail-grid">
        ${detailItem("Status do relatório", diagnostic.report_published ? "Publicado" : "Rascunho")}
        ${detailItem("Link público", diagnostic.report_slug ? getReportLink(diagnostic) : "Será criado ao salvar")}
        ${detailItem("Atualizado em", formatDate(diagnostic.report_updated_at))}
        ${detailItem("Modo de entrega", "Diagnóstico + revisão + publicação")}
      </div>
      <p class="editor-note">
        Use "Copiar prompt GPT", cole no ChatGPT e peça a versão refinada. Depois cole a resposta abaixo e clique em "Importar resposta GPT".
      </p>
      <textarea
        id="gptReportPaste"
        class="gpt-paste"
        spellcheck="false"
        placeholder="Cole aqui o JSON que o GPT devolver. Pode vir puro ou dentro de um bloco de código JSON. A importação preenche o editor final abaixo, mas não publica automaticamente."
      ></textarea>
      <p class="editor-note">
        Edite o JSON final abaixo para ajustar textos, frase guia, paleta, foto principal ou qualquer seção do relatório antes de publicar.
      </p>
      <textarea id="reportDataEditor" class="json-editor" spellcheck="false">${escapeHtml(
        JSON.stringify(diagnostic.report_data || {}, null, 2)
      )}</textarea>
    </section>

    <section class="detail-section">
      <h3>Destaques estratégicos</h3>
      <div class="answer-list">
        ${answerRow("Palavras de percepção desejada", desiredWords)}
        ${answerRow("Percepções a evitar", avoid)}
        ${answerRow("Estilo visual", style)}
        ${answerRow("Onde pretende usar as fotos", usage)}
      </div>
    </section>

    <section class="detail-section">
      <h3>Respostas abertas</h3>
      <div class="answer-list">
        ${answerRow("Objetivo de reposicionamento", get(respostas, "reposicionamento.como_deseja_ser_percebida"))}
        ${answerRow("Mensagem antes de falar", get(respostas, "reposicionamento.mensagem_antes_falar"))}
        ${answerRow("Cliente ideal", get(respostas, "cliente_ideal.cliente_ideal"))}
        ${answerRow("Como deseja ser percebida", get(respostas, "percepcao.percepcao_descricao"))}
        ${answerRow("Minha imagem precisa comunicar", get(respostas, "frases.imagem_precisa_comunicar"))}
      </div>
    </section>

    <section class="detail-section">
      <h3>Respostas completas por bloco</h3>
      ${renderAllBlocks(respostas)}
    </section>
  `;
}

function updateReportButtons(diagnostic) {
  const hasReport = Boolean(diagnostic.report_slug);
  openReportButton.disabled = !hasReport;
  copyReportLinkButton.disabled = !hasReport;
  saveReportButton.disabled = !diagnostic.report_data;
  regenerateReportButton.disabled = false;
  togglePublishReportButton.disabled = !diagnostic.report_data;
  copyGptPromptButton.disabled = !diagnostic.report_data;
  importGptReportButton.disabled = !diagnostic.report_data;
  togglePublishReportButton.textContent = diagnostic.report_published
    ? "Despublicar relatório"
    : "Publicar relatório";
}

function getReportLink(diagnostic) {
  if (!diagnostic?.report_slug) return "";
  return `${window.location.origin}/relatorio/${diagnostic.report_slug}`;
}

function readReportEditor() {
  const editor = document.querySelector("#reportDataEditor");

  if (!editor) {
    throw new Error("Editor do relatório não encontrado.");
  }

  try {
    return JSON.parse(editor.value);
  } catch (error) {
    throw new Error(`JSON do relatório inválido: ${error.message}`);
  }
}

async function saveSelectedReport(published = state.selected?.report_published) {
  if (!state.selected) return;

  const reportData = readReportEditor();
  const updated = await api(`/api/diagnostics/${state.selected.id}/report`, {
    method: "PATCH",
    body: JSON.stringify({
      reportData,
      published: Boolean(published)
    })
  });

  state.selected = updated;
  renderDetail(updated);
  showToast(updated.report_published ? "Relatório salvo e publicado." : "Relatório salvo como rascunho.");
  await loadDashboard();
}

function importGptReportResponse() {
  const paste = document.querySelector("#gptReportPaste");
  const editor = document.querySelector("#reportDataEditor");

  if (!paste || !editor) {
    showToast("Abra um diagnóstico para importar a resposta.");
    return;
  }

  if (!paste.value.trim()) {
    paste.scrollIntoView({ behavior: "smooth", block: "center" });
    paste.focus();
    paste.classList.add("needs-attention");
    window.setTimeout(() => paste.classList.remove("needs-attention"), 1800);
    showToast("Cole a resposta do GPT neste campo e clique em importar novamente.");
    return;
  }

  try {
    const imported = extractJsonFromGptText(paste.value);
    const reportData = normalizeImportedReport(imported);
    const current = readReportEditor();
    editor.value = JSON.stringify({ ...current, ...reportData }, null, 2);
    paste.value = "";
    showToast("Resposta do GPT importada. Revise e salve o relatório.");
  } catch (error) {
    showToast(error.message);
  }
}

function normalizeImportedReport(imported) {
  const reportData = imported?.dadosRelatorio || imported?.reportData || imported?.report || imported;

  if (!reportData || typeof reportData !== "object" || Array.isArray(reportData)) {
    throw new Error("A resposta do GPT precisa conter um objeto JSON de relatório.");
  }

  if (!reportData.origemAnalise) {
    reportData.origemAnalise = "Análise refinada pelo ChatGPT";
  }

  return reportData;
}

function extractJsonFromGptText(text) {
  const content = String(text || "").trim();

  if (!content) {
    throw new Error("Cole a resposta do GPT antes de importar.");
  }

  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : content;

  try {
    return JSON.parse(candidate);
  } catch {
    const first = candidate.indexOf("{");
    const last = candidate.lastIndexOf("}");

    if (first >= 0 && last > first) {
      return JSON.parse(candidate.slice(first, last + 1));
    }

    throw new Error("Não encontrei um JSON válido na resposta do GPT.");
  }
}

function renderAllBlocks(respostas) {
  return responseBlocks
    .map((block) => {
      const rows = block.fields
        .map(([field, label]) => answerRow(label, get(respostas, `${block.id}.${field}`)))
        .join("");

      return `
        <div class="answer-list">
          <h3>${escapeHtml(block.title)}</h3>
          ${rows}
        </div>
      `;
    })
    .join("");
}

function buildGptReportPrompt(diagnostic) {
  const reportDraft = diagnostic.report_data || {};
  const briefing = buildBriefing(diagnostic);

  return `Você é estrategista de imagem profissional, direção fotográfica e posicionamento de marca pessoal para o AURA Fotografia.

Sua tarefa é transformar o diagnóstico abaixo em um relatório premium, personalizado, elegante e estratégico para uma cliente do produto Ensaio Carreira Estratégico.

REGRAS IMPORTANTES
- Responda apenas com JSON válido.
- Não use markdown.
- Não use bloco \`\`\`json.
- Não escreva explicações fora do JSON.
- Preserve as chaves principais do rascunho atual.
- Pode reescrever textos para ficarem mais personalizados, humanos, sofisticados e específicos.
- Não invente fatos que não estejam no diagnóstico.
- O tom deve ser premium, editorial, claro, acolhedor e estratégico.
- O resultado será colado em um sistema que espera um objeto de relatório.
- Crie uma análise explícita mostrando como os arquétipos foram aplicados na imagem.
- Crie orientação de cores por situação de uso, não apenas uma paleta genérica.
- As cores por situação devem orientar fotos de autoridade, proximidade, institucional, conteúdo educativo e vendas/propostas quando fizer sentido.

ESTRUTURA ESPERADA
Devolva um objeto JSON com esta forma:

{
  "dadosRelatorio": {
    "cliente": "Nome",
    "profissao": "Profissão",
    "cidade": "Cidade",
    "data": "Data",
    "logo": "",
    "fotoPrincipal": "",
    "contatoUrl": "#",
    "arquetipoPrincipal": "Arquétipo principal",
    "arquetipoSecundario": "Arquétipo secundário",
    "origemAnalise": "Análise refinada pelo ChatGPT",
    "fraseGuia": "Frase guia refinada",
    "resumoEstrategico": "Texto personalizado",
    "cardsResumo": [
      { "titulo": "Objetivo principal", "destaque": "...", "texto": "..." },
      { "titulo": "Cliente ideal", "destaque": "...", "texto": "..." },
      { "titulo": "Percepção desejada", "destaque": "...", "texto": "..." },
      { "titulo": "Mensagem central", "destaque": "...", "texto": "..." }
    ],
    "arquetipos": [
      { "tipo": "Arquétipo principal", "nome": "...", "descricao": "...", "nasFotos": "..." },
      { "tipo": "Arquétipo secundário", "nome": "...", "descricao": "...", "nasFotos": "..." }
    ],
    "analiseEstrategica": {
      "texto": "Síntese da análise feita com base no diagnóstico.",
      "arquetipoPrincipal": "Explique como o arquétipo principal deve aparecer nas fotos, sem fantasia ou personagem.",
      "arquetipoSecundario": "Explique como o arquétipo secundário complementa o primeiro.",
      "estrategiaCromatica": "Explique como as cores sustentam autoridade, proximidade, sofisticação, clareza ou acolhimento."
    },
    "percepcaoDesejada": ["..."],
    "textoPercepcaoDesejada": "...",
    "orientadoresPercepcao": ["Expressão", "Postura", "Roupa", "Fundo", "Luz", "Escolha final das imagens"],
    "percepcaoEvitar": [
      { "titulo": "Evitar ...", "texto": "..." }
    ],
    "direcaoVisual": [
      { "icone": "spark", "titulo": "Expressão", "texto": "..." },
      { "icone": "line", "titulo": "Postura", "texto": "..." },
      { "icone": "hand", "titulo": "Mãos", "texto": "..." },
      { "icone": "eye", "titulo": "Olhar", "texto": "..." },
      { "icone": "smile", "titulo": "Sorriso", "texto": "..." },
      { "icone": "fabric", "titulo": "Roupas", "texto": "..." },
      { "icone": "frame", "titulo": "Fundos", "texto": "..." },
      { "icone": "sun", "titulo": "Luz", "texto": "..." },
      { "icone": "crop", "titulo": "Enquadramentos", "texto": "..." }
    ],
    "coresSugeridas": [
      { "nome": "...", "hex": "#000000", "uso": "..." }
    ],
    "comoUsarCores": ["..."],
    "coresPorSituacao": [
      {
        "situacao": "Fotos de autoridade",
        "cores": "Nome das cores ou combinação",
        "orientacao": "Como usar roupa, fundo, contraste ou detalhe cromático nesta situação"
      },
      {
        "situacao": "Fotos de proximidade",
        "cores": "Nome das cores ou combinação",
        "orientacao": "Como usar para criar vínculo, acolhimento ou leveza"
      },
      {
        "situacao": "Fotos institucionais",
        "cores": "Nome das cores ou combinação",
        "orientacao": "Como usar em site, perfil, Google Meu Negócio, propostas ou apresentações"
      },
      {
        "situacao": "Conteúdos educativos",
        "cores": "Nome das cores ou combinação",
        "orientacao": "Como usar para transmitir clareza, método e especialidade"
      }
    ],
    "usoFotos": [
      { "tipo": "Foto de perfil", "onde": "...", "objetivo": "...", "exemplo": "..." }
    ],
    "mapaAplicacao": [
      { "canal": "LinkedIn", "imagem": "...", "objetivo": "..." }
    ],
    "orientacaoComunicacao": [
      { "situacao": "Quando falar de autoridade", "foto": "..." }
    ],
    "proximosPassos": ["..."]
  }
}

Mantenha os valores de "icone" exatamente entre estes: spark, line, hand, eye, smile, fabric, frame, sun, crop.

DIAGNÓSTICO COMPLETO
${briefing}

RASCUNHO ATUAL DO RELATÓRIO
Use como base estrutural e refine o conteúdo:

${JSON.stringify(reportDraft, null, 2)}
`;
}

function detailItem(label, value) {
  return `
    <div class="detail-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(valueText(value))}</strong>
    </div>
  `;
}

function optionalDetailItem(label, value) {
  return valueText(value) === "Não informado" ? "" : detailItem(label, value);
}

function answerRow(label, value) {
  return `
    <div class="answer-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(valueText(value))}</strong>
    </div>
  `;
}

function buildBriefing(diagnostic) {
  const r = diagnostic.respostas || {};
  const objetivo = [
    line("Serviço ou produto prioritário", get(r, "identidade.principal_venda")),
    line("Mudança desejada", get(r, "momento.mudancas_desejadas")),
    line("Mensagem antes de falar", get(r, "reposicionamento.mensagem_antes_falar")),
    line("Valor ou posicionamento a sustentar", get(r, "reposicionamento.valor_posicionamento"))
  ]
    .filter(Boolean)
    .join("\n");

  return `BRIEFING PARA ENSAIO AURA

Cliente: ${valueText(diagnostic.nome)}
E-mail: ${valueText(diagnostic.email)}

OBJETIVO PRINCIPAL
${objetivo || "Não informado."}

CLIENTE IDEAL
Quem ela deseja atrair: ${valueText(get(r, "cliente_ideal.cliente_ideal"))}
O que esse cliente valoriza: ${valueText(get(r, "cliente_ideal.cliente_valoriza"))}
Medos do cliente: ${valueText(get(r, "cliente_ideal.medos_cliente"))}
O que a imagem precisa transmitir: ${valueText(get(r, "cliente_ideal.transmitir_diminuir_medo"))}

PERCEPÇÃO DESEJADA
Palavras escolhidas: ${valueText(get(r, "percepcao.palavras_percepcao"))}
Como deseja ser percebida: ${valueText(get(r, "percepcao.percepcao_descricao"))}

PERCEPÇÃO A EVITAR
O que não deseja transmitir: ${valueText(get(r, "imagem_evitar.evitar_transmitir"))}

PERSONALIDADE PROFISSIONAL
Traços escolhidos: ${valueText(get(r, "personalidade.tracos_profissionais"))}
Como clientes descrevem: ${valueText(get(r, "personalidade.descricao_clientes"))}
Frase que combina com sua forma de trabalhar: ${valueText(get(r, "personalidade.frase_trabalho"))}

ARQUÉTIPO VISUAL SUGERIDO
Arquétipo principal: ${displayArchetype(diagnostic.arquetipo_sugerido)}
Arquétipo secundário: ${displayArchetype(diagnostic.arquetipo_secundario)}
Energia escolhida: ${valueText(energyLabels[get(r, "arquetipo_visual.energia_visual")] || get(r, "arquetipo_visual.energia_visual"))}

ESTILO VISUAL
Estilo desejado: ${valueText(get(r, "estilo_visual.estilo_visual"))}
Cores que usa: ${valueText(get(r, "estilo_visual.cores_usa"))}
Cores que evita: ${valueText(get(r, "estilo_visual.cores_evitar"))}
Preferência de fundo: ${valueText(get(r, "estilo_visual.preferencia_fotos"))}

USO DAS IMAGENS
Onde pretende usar: ${valueText(get(r, "aplicacao.uso_fotos"))}
Fotos mais importantes: ${valueText(get(r, "aplicacao.foto_precisa"))}

FRASES DE POSICIONAMENTO
Eu quero ser lembrada ou lembrado como: ${valueText(get(r, "frases.lembrada_como"))}
Meu cliente deve sentir: ${valueText(get(r, "frases.cliente_deve_sentir"))}
Minha imagem precisa comunicar: ${valueText(get(r, "frases.imagem_precisa_comunicar"))}

PEDIDO PARA O CHATGPT
Analise as respostas acima e crie um briefing completo de direção fotográfica para o ensaio. Inclua arquétipo principal, arquétipo secundário, percepção desejada, percepção a evitar, direção de expressão, postura, roupas, cenário, fundos, poses, fotos obrigatórias, narrativa do ensaio e orientações para o relatório final de uso das imagens.`;
}

function line(label, value) {
  const text = valueText(value);
  if (text === "Não informado") return "";
  return `${label}: ${text}`;
}

async function api(url, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Não foi possível concluir a ação.");
  }

  return data;
}

function populateStatusOptions() {
  statusFilter.innerHTML =
    '<option value="">Todos</option>' +
    STATUSES.map((status) => `<option value="${escapeAttr(status)}">${escapeHtml(status)}</option>`).join("");
  detailStatus.innerHTML = STATUSES.map(
    (status) => `<option value="${escapeAttr(status)}">${escapeHtml(status)}</option>`
  ).join("");
}

function get(object, path) {
  return path.split(".").reduce((current, key) => current?.[key], object);
}

function valueText(value) {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "Não informado";
  if (value === null || value === undefined || value === "") return "Não informado";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function displayArchetype(value) {
  return archetypeLabels[value] || valueText(value);
}

function formatDate(value) {
  if (!value) return "Não informado";

  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function slug(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "cliente";
}
