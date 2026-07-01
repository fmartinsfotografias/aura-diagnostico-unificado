const ARCHETYPE_CONTENT = {
  Governante: {
    nome: "Governante",
    descricao: "Comunica autoridade, direção, segurança e presença profissional com alto valor percebido.",
    nasFotos: "Aparece em postura firme, olhar direto, roupas estruturadas, fundos limpos e composições com presença."
  },
  "Sábio": {
    nome: "Sábio",
    descricao: "Traz clareza, profundidade, método e confiança técnica para sustentar a autoridade profissional.",
    nasFotos: "Aparece em enquadramentos limpos, olhar atento, cenas de estudo, escuta, escrita e orientação."
  },
  Sabio: {
    nome: "Sábio",
    descricao: "Traz clareza, profundidade, método e confiança técnica para sustentar a autoridade profissional.",
    nasFotos: "Aparece em enquadramentos limpos, olhar atento, cenas de estudo, escuta, escrita e orientação."
  },
  Cuidador: {
    nome: "Cuidador",
    descricao: "Comunica presença, empatia, proteção e disponibilidade emocional sem perder firmeza.",
    nasFotos: "Aparece em expressões serenas, olhar acolhedor, postura aberta, gestos suaves e luz confortável."
  },
  "Herói": {
    nome: "Herói",
    descricao: "Comunica força, superação, movimento e capacidade de conduzir pessoas para um resultado concreto.",
    nasFotos: "Aparece em posturas ativas, olhar confiante, enquadramentos com energia e sensação de avanço."
  },
  Heroi: {
    nome: "Herói",
    descricao: "Comunica força, superação, movimento e capacidade de conduzir pessoas para um resultado concreto.",
    nasFotos: "Aparece em posturas ativas, olhar confiante, enquadramentos com energia e sensação de avanço."
  },
  Amante: {
    nome: "Amante",
    descricao: "Sustenta beleza, sensibilidade, refinamento, conexão e desejo de aproximação com elegância.",
    nasFotos: "Aparece em luz envolvente, gestos delicados, texturas sofisticadas e composições sensoriais."
  },
  Criador: {
    nome: "Criador",
    descricao: "Comunica originalidade, autoria, expressão estética e capacidade de construir soluções próprias.",
    nasFotos: "Aparece em cenas de processo, elementos autorais, composições criativas e enquadramentos menos óbvios."
  },
  Explorador: {
    nome: "Explorador",
    descricao: "Traz liberdade, autonomia, autenticidade e uma presença profissional com movimento.",
    nasFotos: "Aparece em enquadramentos amplos, ambientes reais, postura espontânea e sensação de caminho aberto."
  },
  "Bobo da Corte": {
    nome: "Bobo da Corte",
    descricao: "Comunica leveza, carisma, espontaneidade e conexão social com energia positiva.",
    nasFotos: "Aparece em expressões abertas, gestos naturais, sorrisos verdadeiros e composições menos rígidas."
  },
  "Pessoa Comum": {
    nome: "Pessoa Comum",
    descricao: "Traz proximidade, simplicidade, verdade e uma sensação de acesso sem barreiras.",
    nasFotos: "Aparece em cenas reais, roupas acessíveis, expressão natural e enquadramentos de conversa."
  },
  Mago: {
    nome: "Mago",
    descricao: "Comunica visão, transformação, magnetismo e capacidade de gerar novas possibilidades.",
    nasFotos: "Aparece em luz mais dramática, olhar presente, composições marcantes e atmosferas com profundidade."
  },
  Rebelde: {
    nome: "Rebelde",
    descricao: "Comunica atitude, diferenciação, coragem e ruptura com padrões visuais previsíveis.",
    nasFotos: "Aparece em poses mais fortes, cortes gráficos, contraste visual e escolhas estéticas com personalidade."
  },
  Inocente: {
    nome: "Inocente",
    descricao: "Traz leveza, transparência, otimismo e uma comunicação visual simples e luminosa.",
    nasFotos: "Aparece em luz clara, expressão suave, fundos leves e composições com sensação de pureza."
  }
};

const AVOID_TEXTS = {
  Frieza: "A autoridade deve aparecer com proximidade, não como distância emocional.",
  Arrogância: "A presença precisa ser segura, mas sem criar superioridade ou dureza na comunicação.",
  Insegurança: "A postura, o olhar e a escolha das imagens devem sustentar firmeza e clareza.",
  "Informalidade demais": "A naturalidade é bem-vinda, mas a imagem precisa preservar intenção profissional.",
  "Seriedade demais": "A imagem pode ser firme sem perder humanidade, respiro e abertura.",
  Sensualidade: "A estética deve sustentar presença profissional, evitando sinais que desviem do posicionamento.",
  Rigidez: "A postura deve ser firme, mas sem endurecer expressão, mãos ou enquadramento.",
  Distância: "A imagem deve transmitir autoridade sem criar frieza ou dificuldade de aproximação.",
  Amadorismo: "A composição precisa comunicar cuidado, acabamento e percepção clara de valor.",
  Exagero: "A sofisticação deve aparecer pelos detalhes, sem excesso de pose, cenário ou edição.",
  "Cara de foto corporativa antiga": "A estética deve ser atual, editorial e natural, sem linguagem engessada.",
  Artificialidade: "Gestos, sorrisos e cenários devem parecer naturais, intencionais e verdadeiros."
};

function get(object, path) {
  return String(path)
    .split(".")
    .reduce((current, key) => current?.[key], object);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function cleanArray(value) {
  return asArray(value)
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .filter((item) => item.toLowerCase() !== "outro");
}

function valueText(value, fallback = "Não informado") {
  if (Array.isArray(value)) return value.length ? value.join(", ") : fallback;
  if (value === undefined || value === null || value === "") return fallback;
  return String(value);
}

function firstText(...values) {
  for (const value of values) {
    const text = valueText(value, "");
    if (text) return text;
  }

  return "";
}

function ensureSentence(text) {
  const clean = String(text || "").trim();
  if (!clean) return "";
  return /[.!?]$/.test(clean) ? clean : `${clean}.`;
}

function slugify(value) {
  return String(value || "cliente")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "cliente";
}

function createReportSlug(id, nome) {
  return `${id}-${slugify(nome)}`;
}

function archetypeCard(tipo, name) {
  const content = ARCHETYPE_CONTENT[name] || ARCHETYPE_CONTENT[normalizeArchetype(name)] || {
    nome: valueText(name, "Não definido"),
    descricao: "Direção visual definida a partir das respostas do diagnóstico.",
    nasFotos: "Aparece nas escolhas de postura, expressão, roupa, fundo, luz e composição."
  };

  return {
    tipo,
    nome: content.nome,
    descricao: content.descricao,
    nasFotos: content.nasFotos
  };
}

function normalizeArchetype(value) {
  const map = {
    Sabio: "Sábio",
    Heroi: "Herói",
    "Nao definido": "Não definido"
  };

  return map[value] || value;
}

function buildAvoidCards(items) {
  return items.map((item) => ({
    titulo: `Evitar ${String(item).toLowerCase()}`,
    texto: AVOID_TEXTS[item] || "A imagem deve evitar qualquer leitura que enfraqueça a confiança, o posicionamento e a percepção de valor."
  }));
}

function buildGuidePhrase(respostas, words) {
  const direct = firstText(
    get(respostas, "frases.imagem_precisa_comunicar"),
    get(respostas, "reposicionamento.mensagem_antes_falar")
  );

  if (direct) {
    const startsWithSubject = /^minha imagem/i.test(direct);
    return ensureSentence(startsWithSubject ? direct : `Minha imagem deve comunicar ${direct}`);
  }

  return `Minha imagem deve comunicar ${words.map((word) => word.toLowerCase()).join(", ")} antes mesmo da primeira conversa.`;
}

function buildReportFromDiagnostic({ id, cadastro, respostas, archetypes, dataEnvio }) {
  const cliente = firstText(cadastro?.nome, get(respostas, "cadastro.nome"), "Nome do Cliente");
  const profissao = firstText(
    cadastro?.profissao,
    get(respostas, "cadastro.profissao"),
    get(respostas, "identidade.area_atuacao"),
    "Profissão"
  );
  const cidade = firstText(cadastro?.cidade, get(respostas, "cadastro.cidade"), "Cidade");
  const desiredWords =
    cleanArray(get(respostas, "percepcao.palavras_percepcao")).slice(0, 5) ||
    [];
  const percepcaoDesejada = desiredWords.length
    ? desiredWords
    : ["Confiança", "Autoridade", "Clareza", "Segurança", "Humanidade"];
  const avoidWords = cleanArray(get(respostas, "imagem_evitar.evitar_transmitir")).slice(0, 4);
  const percepcaoEvitar = buildAvoidCards(
    avoidWords.length ? avoidWords : ["Frieza", "Rigidez", "Distância", "Artificialidade"]
  );
  const principal = normalizeArchetype(archetypes?.principal || "Governante");
  const secundario = normalizeArchetype(archetypes?.secundario || "Sábio");
  const clienteIdeal = firstText(
    get(respostas, "cliente_ideal.cliente_ideal"),
    get(respostas, "identidade.cliente_desejado"),
    "Cliente que valoriza confiança, presença profissional e clareza antes de contratar."
  );
  const objetivoPrincipal = firstText(
    get(respostas, "identidade.principal_venda"),
    get(respostas, "reposicionamento.valor_posicionamento"),
    "Fortalecer a percepção de valor da presença profissional."
  );
  const mensagemCentral = firstText(
    get(respostas, "reposicionamento.mensagem_antes_falar"),
    get(respostas, "frases.imagem_precisa_comunicar"),
    "Você pode confiar nesta presença profissional."
  );
  const estilo = firstText(get(respostas, "estilo_visual.estilo_visual"), "Editorial, elegante e coerente com o posicionamento.");
  const usoPretendido = cleanArray(get(respostas, "aplicacao.uso_fotos"));
  const fotoPrioritaria = cleanArray(get(respostas, "aplicacao.foto_precisa"));
  const fraseGuia = buildGuidePhrase(respostas, percepcaoDesejada);
  const resumoBase = firstText(
    get(respostas, "percepcao.percepcao_descricao"),
    get(respostas, "reposicionamento.como_deseja_ser_percebida")
  );

  return {
    cliente,
    profissao,
    cidade,
    data: dataEnvio
      ? new Date(dataEnvio).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
      : new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
    logo: "",
    fotoPrincipal: "",
    contatoUrl: "#",
    diagnosticoId: id || null,
    arquetipoPrincipal: principal,
    arquetipoSecundario: secundario,
    fraseGuia,
    resumoEstrategico: resumoBase
      ? `${cliente} precisa de uma imagem que traduza ${resumoBase.charAt(0).toLowerCase()}${resumoBase.slice(1)} A direção visual deve conectar posicionamento, confiança e percepção de valor com uma leitura leve, consistente e profissional.`
      : `${cliente} vive um momento de fortalecimento da própria presença profissional. A imagem precisa sustentar ${percepcaoDesejada.map((word) => word.toLowerCase()).join(", ")}, comunicar valor antes do primeiro contato e aproximar o cliente ideal sem perder sofisticação.`,
    cardsResumo: [
      {
        titulo: "Objetivo principal",
        destaque: objetivoPrincipal,
        texto: "Transformar posicionamento em uma presença visual clara, memorável e coerente."
      },
      {
        titulo: "Cliente ideal",
        destaque: clienteIdeal,
        texto: "A imagem deve reduzir dúvidas e criar confiança antes da conversa comercial."
      },
      {
        titulo: "Percepção desejada",
        destaque: percepcaoDesejada.join(", "),
        texto: "Essas palavras guiam expressão, postura, luz, roupa, fundo e escolha final."
      },
      {
        titulo: "Mensagem central",
        destaque: mensagemCentral,
        texto: "Cada imagem precisa sustentar essa leitura com naturalidade e intenção."
      }
    ],
    arquetipos: [
      archetypeCard("Arquétipo principal", principal),
      archetypeCard("Arquétipo secundário", secundario)
    ],
    origemAnalise: "Rascunho automático do sistema",
    analiseEstrategica: {
      texto: `Esta leitura cruza as palavras de percepção desejada, a energia visual escolhida e os canais onde ${cliente} pretende usar as imagens. O objetivo é transformar o diagnóstico em decisões práticas para expressão, postura, roupas, fundos, luz, cores e escolha final das fotos.`,
      arquetipoPrincipal: `O arquétipo ${principal} deve conduzir a primeira impressão: ele orienta o grau de presença, segurança e intenção que precisa aparecer nas imagens principais.`,
      arquetipoSecundario: `O arquétipo ${secundario} funciona como complemento: ele evita que a imagem fique unilateral e ajuda a equilibrar autoridade, proximidade e personalidade.`,
      estrategiaCromatica: "A paleta deve apoiar a leitura emocional de cada foto. Tons profundos sustentam autoridade; tons claros aproximam; detalhes dourados elevam a percepção de valor sem competir com a expressão."
    },
    percepcaoDesejada,
    textoPercepcaoDesejada: `Essas palavras orientam a forma como ${cliente} deve aparecer nas imagens. A expressão precisa sustentar ${percepcaoDesejada[0].toLowerCase()}, a postura deve traduzir segurança, a roupa deve reforçar o posicionamento e a luz deve tornar a presença mais clara, humana e profissional.`,
    orientadoresPercepcao: ["Expressão", "Postura", "Roupa", "Fundo", "Luz", "Escolha final das imagens"],
    percepcaoEvitar,
    direcaoVisual: [
      {
        icone: "spark",
        titulo: "Expressão",
        texto: `Serena, presente e coerente com ${percepcaoDesejada.slice(0, 3).map((word) => word.toLowerCase()).join(", ")}.`
      },
      {
        icone: "line",
        titulo: "Postura",
        texto: "Coluna alongada, ombros relaxados e corpo orientado para abertura e segurança."
      },
      {
        icone: "hand",
        titulo: "Mãos",
        texto: "Gestos suaves, mãos em repouso ou em ação discreta para evitar tensão visual."
      },
      {
        icone: "eye",
        titulo: "Olhar",
        texto: "Direto para confiança e autoridade; lateral quando a imagem pedir reflexão."
      },
      {
        icone: "smile",
        titulo: "Sorriso",
        texto: "Natural, contido quando necessário e sempre alinhado ao objetivo da imagem."
      },
      {
        icone: "fabric",
        titulo: "Roupas",
        texto: `Peças com bom caimento e coerentes com o estilo desejado: ${estilo}.`
      },
      {
        icone: "frame",
        titulo: "Fundos",
        texto: "Ambientes limpos, profissionais e silenciosos, sem competir com a expressão."
      },
      {
        icone: "sun",
        titulo: "Luz",
        texto: "Luz elegante, macia e direcional o suficiente para criar profundidade."
      },
      {
        icone: "crop",
        titulo: "Enquadramentos",
        texto: "Retratos próximos para vínculo e planos médios para autoridade contextual."
      }
    ],
    coresSugeridas: [
      { nome: "Azul petróleo", hex: "#031923", uso: "Autoridade e profundidade" },
      { nome: "Off white", hex: "#F7F1E6", uso: "Clareza, respiro e proximidade" },
      { nome: "Dourado discreto", hex: "#D6A84F", uso: "Sofisticação e valor percebido" }
    ],
    comoUsarCores: [
      "Use tons mais profundos em fotos de autoridade.",
      "Use tons claros em imagens de proximidade.",
      "Evite cores que chamem mais atenção do que sua expressão.",
      "Mantenha coerência entre roupa, fundo e objetivo da imagem."
    ],
    coresPorSituacao: [
      {
        situacao: "Fotos de autoridade",
        cores: "Azul petróleo, azul profundo e off white",
        orientacao: "Use bases escuras, peças estruturadas e contraste limpo para comunicar segurança, profundidade e posicionamento."
      },
      {
        situacao: "Fotos de proximidade",
        cores: "Off white, tons claros e neutros suaves",
        orientacao: "Use cores que iluminem o rosto e reduzam distância, especialmente para conteúdos de acolhimento, apresentação e bastidores."
      },
      {
        situacao: "Fotos institucionais",
        cores: "Azul petróleo, off white e dourado discreto",
        orientacao: "Combine profundidade com respiro para site, propostas, apresentações e pontos oficiais da presença profissional."
      },
      {
        situacao: "Conteúdos educativos",
        cores: "Azul profundo com pontos de clareza",
        orientacao: "Use fundos limpos e contraste moderado para reforçar técnica, organização mental e leitura objetiva."
      }
    ],
    usoFotos: [
      {
        tipo: "Foto de perfil",
        onde: "WhatsApp profissional, LinkedIn e Instagram.",
        objetivo: "Criar reconhecimento imediato e confiança no primeiro contato.",
        exemplo: "Retrato próximo, olhar direto, expressão coerente e fundo limpo."
      },
      {
        tipo: "Foto de autoridade",
        onde: "Posts educativos, palestras, propostas e materiais institucionais.",
        objetivo: "Sustentar domínio técnico, segurança e percepção de valor.",
        exemplo: "Plano médio, postura firme, roupa estruturada e composição elegante."
      },
      {
        tipo: "Foto de proximidade",
        onde: "Stories, bastidores, apresentação pessoal e conteúdos de conexão.",
        objetivo: "Mostrar humanidade, acesso e presença real.",
        exemplo: "Sorriso leve, luz suave e enquadramento com sensação de conversa."
      },
      {
        tipo: "Foto institucional",
        onde: "Site, página de contato, Google Meu Negócio e apresentações.",
        objetivo: "Dar consistência profissional aos pontos oficiais da marca pessoal.",
        exemplo: "Imagem limpa, vertical ou horizontal, com espaço para textos."
      },
      {
        tipo: "Foto para conteúdo",
        onde: "Carrosséis, capas de vídeo, newsletters e posts de reflexão.",
        objetivo: "Acompanhar ideias importantes com presença visual coerente.",
        exemplo: "Olhar lateral, gesto de leitura ou cena que sugira pensamento."
      },
      {
        tipo: "Foto para site",
        onde: "Página inicial, seção sobre, página de serviços e captação.",
        objetivo: "Construir uma primeira impressão premium, clara e memorável.",
        exemplo: "Imagem ampla, bem iluminada, com respiro para chamada textual."
      }
    ],
    mapaAplicacao: [
      { canal: "LinkedIn", imagem: "Foto de autoridade", objetivo: "Reforçar credibilidade, clareza e posicionamento profissional." },
      { canal: "Instagram", imagem: "Perfil, conteúdo e proximidade", objetivo: "Combinar reconhecimento, vínculo e consistência editorial." },
      { canal: "WhatsApp profissional", imagem: "Foto de perfil", objetivo: "Transmitir confiança antes da primeira mensagem." },
      { canal: "Site", imagem: "Foto institucional", objetivo: "Apresentar presença profissional com sofisticação e objetividade." },
      { canal: "Google Meu Negócio", imagem: "Foto institucional", objetivo: "Tornar a escolha pelo atendimento mais segura e próxima." },
      { canal: "Propostas comerciais", imagem: "Foto de autoridade", objetivo: "Elevar a percepção de valor do serviço apresentado." },
      { canal: "Apresentações", imagem: "Foto de autoridade", objetivo: "Apoiar palestras, aulas e materiais com presença confiável." },
      { canal: "Posts de autoridade", imagem: "Conteúdo ou autoridade", objetivo: "Dar peso visual a orientações, reflexões e análises." },
      { canal: "Bastidores", imagem: "Foto de proximidade", objetivo: "Humanizar a rotina e aproximar sem perder elegância." }
    ],
    orientacaoComunicacao: [
      {
        situacao: "Quando falar de autoridade",
        foto: "Use fotos com olhar direto, postura firme e composição mais limpa."
      },
      {
        situacao: "Quando falar de bastidores",
        foto: "Use imagens leves, naturais e próximas, com sensação de rotina real."
      },
      {
        situacao: "Quando falar de venda",
        foto: "Use uma imagem segura, objetiva e acolhedora, com leitura imediata."
      },
      {
        situacao: "Quando falar da própria história",
        foto: "Use fotos mais humanas, com expressão suave e clima contemplativo."
      },
      {
        situacao: "Quando falar de conteúdo educativo",
        foto: "Use imagens de clareza técnica: leitura, escrita, fala ou olhar atento."
      }
    ],
    proximosPassos: [
      "Atualizar foto de perfil no WhatsApp profissional",
      "Atualizar LinkedIn",
      "Atualizar Instagram",
      "Revisar bio",
      "Criar post de apresentação",
      "Usar foto de autoridade em conteúdos educativos",
      "Usar foto próxima em stories",
      "Atualizar site ou página de contato",
      "Usar imagens em propostas comerciais",
      "Manter coerência entre imagem, texto e oferta"
    ],
    dadosOrigem: {
      usoPretendido,
      fotoPrioritaria,
      estilo
    }
  };
}

module.exports = {
  buildReportFromDiagnostic,
  createReportSlug
};
