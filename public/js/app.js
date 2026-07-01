const DRAFT_KEY = "auraDiagnosticDraftV1";
const TOTAL_STEPS = 12;

const cadastroFields = ["nome", "email"];

const energyOptions = [
  {
    value: "Governante",
    label: "Autoridade, comando, presença, elegância, liderança."
  },
  {
    value: "Sábio",
    label: "Conhecimento, clareza, profundidade, técnica, orientação."
  },
  {
    value: "Cuidador",
    label: "Cuidado, empatia, acolhimento, proteção, escuta."
  },
  {
    value: "Herói",
    label: "Transformação, confiança, evolução, conquista, superação."
  },
  {
    value: "Amante",
    label: "Beleza, sensibilidade, desejo, conexão, sofisticação."
  },
  {
    value: "Criador",
    label: "Criatividade, originalidade, expressão, estética, inovação."
  },
  {
    value: "Explorador",
    label: "Liberdade, movimento, descoberta, autenticidade, independência."
  },
  {
    value: "Bobo da Corte",
    label: "Carisma, leveza, espontaneidade, humor, energia social."
  },
  {
    value: "Pessoa Comum",
    label: "Simplicidade, proximidade, verdade, acessibilidade, conexão real."
  },
  {
    value: "Mago",
    label: "Visão, magnetismo, transformação, desejo, encantamento."
  },
  {
    value: "Rebelde",
    label: "Ruptura, atitude, coragem, provocação, diferenciação."
  },
  {
    value: "Inocente",
    label: "Pureza, leveza, otimismo, transparência, simplicidade."
  }
];

const blocks = [
  {
    id: "identidade",
    title: "Identidade profissional",
    fields: [
      { id: "area_atuacao", type: "textarea", label: "Área de atuação", required: true },
      {
        id: "principal_venda",
        type: "textarea",
        label: "Hoje, qual serviço ou produto você mais deseja vender?",
        required: true
      },
      {
        id: "cliente_atual",
        type: "textarea",
        label: "Quem costuma contratar você hoje?",
        required: true
      },
      {
        id: "cliente_desejado",
        type: "textarea",
        label: "Quem você deseja atrair daqui para frente?",
        required: true
      },
      {
        id: "faixa_cliente",
        type: "radio",
        label: "Qual faixa de cliente você deseja atingir?",
        required: true,
        options: ["Popular", "Intermediário", "Premium", "Alto padrão", "Corporativo", "Outro"]
      },
      {
        id: "resumo_trabalho",
        type: "textarea",
        label: "Como você resumiria seu trabalho em uma frase?",
        required: true
      }
    ]
  },
  {
    id: "momento",
    title: "Momento atual",
    fields: [
      {
        id: "imagem_atual",
        type: "radio",
        label: "Como você sente que sua imagem profissional está hoje?",
        required: true,
        options: [
          "Atualizada",
          "Boa, mas sem estratégia",
          "Desatualizada",
          "Muito simples para o nível do meu trabalho",
          "Não representa mais quem eu sou",
          "Não sei avaliar"
        ]
      },
      {
        id: "incomodos_imagem",
        type: "checkbox",
        label: "O que mais te incomoda na sua imagem atual?",
        required: true,
        options: [
          "Ela parece amadora",
          "Ela parece fria",
          "Ela parece comum",
          "Ela não passa autoridade",
          "Ela não mostra minha personalidade",
          "Ela não combina com o preço que cobro",
          "Ela não conversa com o público que desejo atrair",
          "Outro"
        ]
      },
      {
        id: "mudancas_desejadas",
        type: "checkbox",
        label: "Qual mudança você deseja provocar com essas novas imagens?",
        required: true,
        options: [
          "Parecer mais profissional",
          "Parecer mais confiante",
          "Parecer mais sofisticado",
          "Parecer mais acessível",
          "Parecer mais especialista",
          "Parecer mais criativo",
          "Parecer mais forte",
          "Parecer mais acolhedor",
          "Reposicionar minha marca pessoal",
          "Outro"
        ]
      },
      {
        id: "percepcao_antiga",
        type: "textarea",
        label: "Qual percepção antiga você deseja deixar para trás?",
        required: true
      }
    ]
  },
  {
    id: "reposicionamento",
    title: "Objetivo de reposicionamento",
    fields: [
      {
        id: "como_deseja_ser_percebida",
        type: "textarea",
        label: "Como você deseja ser percebida ou percebido pelo seu cliente?",
        required: true
      },
      {
        id: "nivel_cliente_desejado",
        type: "textarea",
        label: "Qual nível de cliente você deseja atrair?",
        required: true
      },
      {
        id: "valor_posicionamento",
        type: "textarea",
        label: "Qual valor ou posicionamento sua imagem precisa sustentar?",
        required: true
      },
      {
        id: "mensagem_antes_falar",
        type: "textarea",
        label: "Qual mensagem sua imagem precisa comunicar antes de você falar?",
        required: true
      }
    ]
  },
  {
    id: "cliente_ideal",
    title: "Cliente ideal",
    fields: [
      {
        id: "cliente_ideal",
        type: "textarea",
        label: "Quem é o cliente que você mais deseja atrair?",
        required: true
      },
      {
        id: "cliente_valoriza",
        type: "checkbox",
        label: "O que esse cliente valoriza antes de contratar alguém como você?",
        required: true,
        options: [
          "Preço",
          "Confiança",
          "Autoridade",
          "Indicação",
          "Aparência profissional",
          "Experiência",
          "Atendimento",
          "Resultado",
          "Conexão emocional",
          "Status",
          "Segurança",
          "Rapidez",
          "Outro"
        ]
      },
      {
        id: "medos_cliente",
        type: "checkbox",
        label: "Qual medo esse cliente tem antes de contratar você?",
        required: true,
        options: [
          "Pagar caro e não ter resultado",
          "Contratar alguém sem experiência",
          "Não ser bem atendido",
          "Não confiar na pessoa",
          "Não entender o valor do serviço",
          "Ter vergonha ou insegurança",
          "Outro"
        ]
      },
      {
        id: "transmitir_diminuir_medo",
        type: "textarea",
        label: "O que sua imagem precisa transmitir para diminuir esse medo?",
        required: true
      }
    ]
  },
  {
    id: "percepcao",
    title: "Percepção desejada",
    fields: [
      {
        id: "palavras_percepcao",
        type: "checkbox",
        label: "Quando alguém olhar para suas fotos, quais palavras você quer que venham à mente?",
        hint: "Escolha até 5 opções.",
        required: true,
        maxSelections: 5,
        options: [
          "Confiança",
          "Autoridade",
          "Sofisticação",
          "Proximidade",
          "Acolhimento",
          "Força",
          "Leveza",
          "Criatividade",
          "Elegância",
          "Segurança",
          "Experiência",
          "Modernidade",
          "Humanidade",
          "Liderança",
          "Clareza",
          "Inspiração",
          "Resultado",
          "Cuidado",
          "Exclusividade",
          "Energia"
        ]
      },
      {
        id: "percepcao_descricao",
        type: "textarea",
        label: "Explique com suas palavras como você quer ser percebida ou percebido pelo seu cliente.",
        required: true
      }
    ]
  },
  {
    id: "personalidade",
    title: "Personalidade profissional",
    fields: [
      {
        id: "tracos_profissionais",
        type: "checkbox",
        label: "No trabalho, você se considera mais:",
        required: true,
        options: [
          "Analítico",
          "Emocional",
          "Direto",
          "Criativo",
          "Acolhedor",
          "Reservado",
          "Comunicativo",
          "Estratégico",
          "Inspirador",
          "Prático"
        ]
      },
      {
        id: "descricao_clientes",
        type: "textarea",
        label: "Como seus clientes costumam descrever você?",
        required: true
      },
      {
        id: "frase_trabalho",
        type: "radio",
        label: "Qual destas frases combina mais com sua forma de trabalhar?",
        required: true,
        options: [
          "Eu conduzo com segurança.",
          "Eu acolho e cuido.",
          "Eu ensino e oriento.",
          "Eu crio soluções diferentes.",
          "Eu inspiro transformação.",
          "Eu simplifico decisões.",
          "Eu entrego beleza e experiência.",
          "Eu lidero processos.",
          "Eu ajudo pessoas a se sentirem melhores.",
          "Eu trago clareza."
        ]
      }
    ]
  },
  {
    id: "arquetipo_visual",
    title: "Arquétipo visual",
    fields: [
      {
        id: "energia_visual",
        type: "radio",
        label: "Qual energia combina mais com a imagem que você deseja construir?",
        required: true,
        options: energyOptions
      }
    ]
  },
  {
    id: "imagem_evitar",
    title: "Imagem a evitar",
    fields: [
      {
        id: "evitar_transmitir",
        type: "checkbox",
        label: "O que você não quer transmitir nas fotos?",
        required: true,
        options: [
          "Frieza",
          "Arrogância",
          "Insegurança",
          "Informalidade demais",
          "Seriedade demais",
          "Sensualidade",
          "Rigidez",
          "Distância",
          "Amadorismo",
          "Exagero",
          "Cara de foto corporativa antiga",
          "Artificialidade",
          "Outro"
        ]
      },
      {
        id: "estilo_nao_gosta",
        type: "textarea",
        label: "Existe algum estilo de foto profissional que você não gosta?",
        required: true
      },
      {
        id: "sente_imagem_atual",
        type: "textarea",
        label: "O que você sente quando vê sua imagem atual nas redes?",
        required: true
      }
    ]
  },
  {
    id: "estilo_visual",
    title: "Estilo visual",
    fields: [
      {
        id: "estilo_visual",
        type: "radio",
        label: "Qual estilo visual mais combina com você?",
        required: true,
        options: [
          "Clássico e elegante",
          "Moderno e minimalista",
          "Sofisticado e marcante",
          "Leve e natural",
          "Criativo e autoral",
          "Corporativo e seguro",
          "Acolhedor e humano",
          "Forte e imponente",
          "Editorial e refinado"
        ]
      },
      {
        id: "cores_usa",
        type: "textarea",
        label: "Quais cores você costuma usar no trabalho?",
        required: true
      },
      {
        id: "cores_evitar",
        type: "textarea",
        label: "Quais cores você evita?",
        required: true
      },
      {
        id: "preferencia_fotos",
        type: "checkbox",
        label: "Você prefere fotos:",
        required: true,
        options: [
          "Com fundo claro",
          "Com fundo escuro",
          "Com ambiente de trabalho",
          "Com fundo neutro",
          "Com elementos da profissão",
          "Com estética editorial",
          "Ainda não sei"
        ]
      }
    ]
  },
  {
    id: "aplicacao",
    title: "Aplicação das imagens",
    fields: [
      {
        id: "uso_fotos",
        type: "checkbox",
        label: "Onde você pretende usar as fotos?",
        required: true,
        options: [
          "LinkedIn",
          "Instagram",
          "WhatsApp",
          "Site",
          "Google Meu Negócio",
          "Material impresso",
          "Palestras",
          "Cursos",
          "Bio profissional",
          "Anúncios",
          "Imprensa",
          "Apresentações comerciais",
          "Outro"
        ]
      },
      {
        id: "foto_precisa",
        type: "checkbox",
        label: "Qual foto você mais precisa hoje?",
        required: true,
        options: [
          "Foto de perfil",
          "Foto de autoridade",
          "Foto para capa ou banner",
          "Foto para posts",
          "Foto para site",
          "Foto para apresentação",
          "Foto mais humana e próxima",
          "Foto mais sofisticada",
          "Foto com expressão forte",
          "Foto sorrindo",
          "Foto séria"
        ]
      }
    ]
  },
  {
    id: "frases",
    title: "Frases de posicionamento",
    fields: [
      {
        id: "lembrada_como",
        type: "textarea",
        label: "Eu quero ser lembrada ou lembrado como uma pessoa profissional que...",
        required: true
      },
      {
        id: "cliente_deve_sentir",
        type: "textarea",
        label: "Meu cliente deve sentir que, ao me contratar, ele terá...",
        required: true
      },
      {
        id: "imagem_precisa_comunicar",
        type: "textarea",
        label: "Minha imagem precisa comunicar...",
        required: true
      }
    ]
  }
];

const state = loadDraft();

const landingView = document.querySelector("#landingView");
const formView = document.querySelector("#formView");
const successView = document.querySelector("#successView");
const signupForm = document.querySelector("#signupForm");
const signupMessage = document.querySelector("#signupMessage");
const questionForm = document.querySelector("#questionForm");
const fieldsContainer = document.querySelector("#fieldsContainer");
const blockTitle = document.querySelector("#blockTitle");
const stepText = document.querySelector("#stepText");
const progressBar = document.querySelector("#progressBar");
const formMessage = document.querySelector("#formMessage");
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");
const toast = document.querySelector("#toast");

hydrateCadastro();
bindCadastro();

if (state.started && hasCadastro()) {
  showForm();
} else {
  showLanding();
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  readCadastroFromForm();

  const message = validateCadastro();
  if (message) {
    signupMessage.textContent = message;
    return;
  }

  signupMessage.textContent = "";
  state.started = true;
  state.currentStep = Number(state.currentStep || 0);
  saveDraft();
  showForm();
});

backButton.addEventListener("click", () => {
  formMessage.textContent = "";

  if (state.currentStep === 0) {
    state.started = false;
    saveDraft();
    showLanding();
    return;
  }

  state.currentStep -= 1;
  saveDraft();
  renderStep();
  scrollToTop();
});

questionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateCurrentStep()) return;

  if (state.currentStep < blocks.length - 1) {
    state.currentStep += 1;
    saveDraft();
    renderStep();
    scrollToTop();
    return;
  }

  await submitDiagnostic();
});

function loadDraft() {
  const fallback = { cadastro: {}, respostas: {}, currentStep: 0, started: false };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}") };
  } catch {
    return fallback;
  }
}

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
}

function hydrateCadastro() {
  cadastroFields.forEach((field) => {
    const input = document.querySelector(`[name="${field}"]`);
    if (input) input.value = state.cadastro?.[field] || "";
  });
}

function bindCadastro() {
  cadastroFields.forEach((field) => {
    const input = document.querySelector(`[name="${field}"]`);
    if (!input) return;

    input.addEventListener("input", () => {
      readCadastroFromForm();
      saveDraft();
    });
  });
}

function readCadastroFromForm() {
  state.cadastro = {};
  cadastroFields.forEach((field) => {
    const input = document.querySelector(`[name="${field}"]`);
    state.cadastro[field] = input ? input.value.trim() : "";
  });
}

function hasCadastro() {
  return ["nome", "email"].every((field) => state.cadastro?.[field]);
}

function validateCadastro() {
  const labels = {
    nome: "nome completo",
    email: "e-mail"
  };

  const missing = cadastroFields.find((field) => !state.cadastro?.[field]);
  if (missing) return `Preencha ${labels[missing]}.`;

  if (!/^\S+@\S+\.\S+$/.test(state.cadastro.email)) {
    return "Informe um e-mail válido.";
  }

  return "";
}

function showLanding() {
  landingView.hidden = false;
  formView.hidden = true;
  successView.hidden = true;
  hydrateCadastro();
}

function showForm() {
  landingView.hidden = true;
  formView.hidden = false;
  successView.hidden = true;
  renderStep();
  scrollToTop();
}

function showSuccess() {
  landingView.hidden = true;
  formView.hidden = true;
  successView.hidden = false;
  scrollToTop();
}

function renderStep() {
  const block = blocks[state.currentStep] || blocks[0];
  const realStep = state.currentStep + 2;

  blockTitle.textContent = block.title;
  stepText.textContent = `Etapa ${realStep} de ${TOTAL_STEPS}`;
  progressBar.style.width = `${Math.round((realStep / TOTAL_STEPS) * 100)}%`;
  fieldsContainer.innerHTML = block.fields.map((field) => renderField(block, field)).join("");
  formMessage.textContent = "";
  nextButton.textContent = state.currentStep === blocks.length - 1 ? "Enviar diagnóstico" : "Próximo";
  bindStepFields(block);
}

function renderField(block, field) {
  const value = getAnswer(block.id, field);
  const hint = field.hint ? `<span class="field-hint">${escapeHtml(field.hint)}</span>` : "";
  const requiredMark = field.required ? "" : " opcional";

  if (field.type === "textarea") {
    return `
      <div class="field">
        <label for="${field.id}">${escapeHtml(field.label)}${requiredMark}</label>
        ${hint}
        <textarea id="${field.id}" data-field="${field.id}">${escapeHtml(value || "")}</textarea>
      </div>
    `;
  }

  if (field.type === "radio" || field.type === "checkbox") {
    return `
      <fieldset class="field">
        <legend class="field-label">${escapeHtml(field.label)}${requiredMark}</legend>
        ${hint}
        <div class="choice-grid">
          ${field.options.map((option) => renderOption(block, field, option, value)).join("")}
        </div>
      </fieldset>
    `;
  }

  return `
    <div class="field">
      <label for="${field.id}">${escapeHtml(field.label)}${requiredMark}</label>
      ${hint}
      <input id="${field.id}" data-field="${field.id}" type="text" value="${escapeAttr(value || "")}" />
    </div>
  `;
}

function renderOption(block, field, option, currentValue) {
  const value = option.value || option;
  const label = option.label || option;
  const id = `${block.id}_${field.id}_${slug(value)}`;
  const checked =
    field.type === "checkbox"
      ? Array.isArray(currentValue) && currentValue.includes(value)
      : currentValue === value;

  return `
    <label class="choice" for="${id}">
      <input
        id="${id}"
        data-field="${field.id}"
        name="${block.id}_${field.id}"
        type="${field.type}"
        value="${escapeAttr(value)}"
        ${checked ? "checked" : ""}
      />
      <span>${escapeHtml(label)}</span>
    </label>
  `;
}

function bindStepFields(block) {
  fieldsContainer.querySelectorAll("textarea, input").forEach((input) => {
    const eventName = input.type === "checkbox" || input.type === "radio" ? "change" : "input";
    input.addEventListener(eventName, () => updateAnswerFromInput(block, input));
  });
}

function updateAnswerFromInput(block, input) {
  const field = block.fields.find((item) => item.id === input.dataset.field);
  if (!field) return;

  state.respostas[block.id] = state.respostas[block.id] || {};

  if (field.type === "checkbox") {
    const selected = Array.from(
      fieldsContainer.querySelectorAll(`input[data-field="${field.id}"]:checked`)
    ).map((item) => item.value);

    if (field.maxSelections && selected.length > field.maxSelections) {
      input.checked = false;
      showToast(`Escolha no máximo ${field.maxSelections} opções.`);
      return;
    }

    state.respostas[block.id][field.id] = selected;
  } else if (field.type === "radio") {
    if (input.checked) state.respostas[block.id][field.id] = input.value;
  } else {
    state.respostas[block.id][field.id] = input.value.trim();
  }

  saveDraft();
}

function validateCurrentStep() {
  const block = blocks[state.currentStep];
  const firstMissing = block.fields.find((field) => {
    if (!field.required) return false;
    const value = getAnswer(block.id, field);
    return Array.isArray(value) ? value.length === 0 : !String(value || "").trim();
  });

  if (firstMissing) {
    formMessage.textContent = `Responda: ${firstMissing.label}`;
    return false;
  }

  formMessage.textContent = "";
  return true;
}

async function submitDiagnostic() {
  nextButton.disabled = true;
  backButton.disabled = true;
  nextButton.textContent = "Enviando...";

  try {
    const response = await fetch("/api/diagnostics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cadastro: state.cadastro,
        respostas: {
          cadastro: state.cadastro,
          ...state.respostas
        }
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Não foi possível enviar o diagnóstico.");
    }

    localStorage.removeItem(DRAFT_KEY);
    showSuccess();
  } catch (error) {
    formMessage.textContent = error.message;
  } finally {
    nextButton.disabled = false;
    backButton.disabled = false;
    nextButton.textContent = "Enviar diagnóstico";
  }
}

function getAnswer(blockId, field) {
  const current = state.respostas?.[blockId]?.[field.id];
  if (current !== undefined) return current;
  return field.type === "checkbox" ? [] : "";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
