# AURA Diagnóstico Unificado

Sistema completo com:

- questionário de diagnóstico;
- painel administrativo;
- geração automática do relatório premium;
- editor JSON do relatório;
- publicação/despublicação;
- link público em `/relatorio/:slug`.

## Acessos locais

Com o servidor rodando:

- Diagnóstico: http://127.0.0.1:3110/
- Admin: http://127.0.0.1:3110/admin

Login padrão do admin:

- E-mail: `admin@aura.com`
- Senha: `aura123`

## Fluxo de uso

1. A cliente responde o diagnóstico.
2. O sistema gera automaticamente um rascunho do relatório premium.
3. No admin, abra o diagnóstico em `Ver diagnóstico`.
4. Revise o bloco `Relatório premium`.
5. Para usar o ChatGPT manualmente, clique em `Copiar prompt GPT`.
6. Cole o prompt no ChatGPT.
7. Copie a resposta do ChatGPT.
8. Cole a resposta no campo `Cole aqui o JSON que o GPT devolver`.
9. Clique em `Importar resposta GPT`.
10. Revise o JSON final.
11. Clique em `Salvar relatório`.
12. Clique em `Publicar relatório`.
13. Clique em `Copiar link` e envie para a cliente.

Enquanto o relatório não estiver publicado, o link público fica bloqueado para a cliente. Logado no admin, você consegue pré-visualizar mesmo em rascunho.

## Ponte manual com ChatGPT

O sistema não chama a API do ChatGPT automaticamente. Ele prepara um prompt com:

- respostas completas do diagnóstico;
- arquétipo calculado;
- rascunho atual do relatório;
- estrutura JSON esperada pela página premium.

Depois você cola no ChatGPT, recebe um JSON mais personalizado e importa esse conteúdo no admin. Isso mantém controle editorial antes da publicação e evita expor chave de API no site.

Quando a resposta do ChatGPT é importada, o relatório passa a exibir blocos específicos para:

- leitura estratégica feita a partir do diagnóstico;
- aplicação do arquétipo principal;
- aplicação do arquétipo secundário;
- estratégia cromática;
- cores recomendadas por situação de uso.

Esses campos ajudam a mostrar que o relatório não é apenas um template: ele usa as respostas para orientar arquétipos, paleta, postura visual e aplicação prática das imagens.

## Rodar manualmente

No PowerShell, dentro desta pasta:

```powershell
$env:PORT="3110"
npm start
```

Se não definir `PORT`, o sistema usa a porta `3000`.

## Publicar no Render

Para colocar o sistema na internet, siga o guia:

```text
DEPLOY-RENDER.md
```

Em produção, configure o banco no disco persistente com:

```text
DB_PATH=/var/data/aura.sqlite
```

## Arquivos principais

- `public/index.html`: diagnóstico da cliente.
- `public/admin.html`: painel administrativo.
- `public/relatorio.html`: relatório premium.
- `server/reportBuilder.js`: transforma respostas em relatório.
- `server/routes/diagnostics.js`: salva diagnóstico e controla revisão/publicação.
- `server/routes/reports.js`: entrega o relatório público.
