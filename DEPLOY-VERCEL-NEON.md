# Deploy gratuito: Vercel + Neon

Este e o caminho recomendado para colocar o diagnostico no ar sem depender de disco pago no Render.

- A Vercel hospeda o site e o backend Node/Express.
- O Neon guarda os diagnosticos em um banco Postgres.
- O projeto usa SQLite apenas quando voce roda localmente sem `DATABASE_URL`.

Referencias oficiais:

- Vercel Node server: https://vercel.com/docs/functions/runtimes/node-js
- Variaveis de ambiente na Vercel: https://vercel.com/docs/environment-variables
- Connection string do Neon: https://neon.com/docs/connect/connect-from-any-app
- Precos Neon: https://neon.com/pricing

## 1. Subir os arquivos atualizados no GitHub

No repositorio `aura-diagnostico-unificado`, envie tambem estes arquivos novos/alterados:

- `server.js`
- `server/app.js`
- `server/authCookie.js`
- `server/database.js`
- `server/routes/auth.js`
- `server/routes/diagnostics.js`
- `server/routes/reports.js`
- `package.json`
- `package-lock.json`
- `.env.example`
- `DEPLOY-VERCEL-NEON.md`

Se voce estiver usando a tela de upload do GitHub:

1. Entre no repositorio.
2. Clique em `Add file`.
3. Clique em `Upload files`.
4. Arraste a pasta/arquivos atualizados.
5. No fim da pagina, clique em `Commit changes`.

## 2. Criar o banco gratuito no Neon

1. Acesse https://neon.com.
2. Crie uma conta ou faca login.
3. Clique em `New Project`.
4. Pode deixar o nome como `aura-diagnostico`.
5. Escolha uma regiao proxima, se aparecer essa opcao.
6. Depois que criar, clique em `Connect`.
7. Copie a connection string.

Use a string completa, parecida com:

```text
postgresql://usuario:senha@ep-alguma-coisa-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

Preferencialmente use a versao com `-pooler` no host, porque ela lida melhor com muitas conexoes em ambiente serverless.

## 3. Criar o projeto na Vercel

1. Acesse https://vercel.com.
2. Crie uma conta ou faca login.
3. Clique em `Add New`.
4. Clique em `Project`.
5. Escolha `Import Git Repository`.
6. Selecione o repositorio `aura-diagnostico-unificado`.
7. Em `Framework Preset`, deixe como `Other` se aparecer.
8. Nao precisa preencher build command.
9. Nao precisa preencher output directory.

Antes de clicar em deploy, configure as variaveis abaixo.

## 4. Variaveis de ambiente na Vercel

Na tela do projeto, procure `Environment Variables` e adicione:

```text
DATABASE_URL=cole_a_connection_string_do_neon_aqui
SESSION_SECRET=crie_uma_frase_grande_e_secreta
AURA_ADMIN_EMAIL=seu_email_de_admin
AURA_ADMIN_PASSWORD=sua_senha_forte
```

Exemplo de `SESSION_SECRET`:

```text
aura-fotografia-login-2026-frase-secreta-bem-grande
```

Marque as variaveis para `Production`, `Preview` e `Development` se a Vercel mostrar essas opcoes.

Importante: nao coloque `DB_PATH` na Vercel. O `DB_PATH` era para o Render com disco persistente, e foi justamente o ponto que gerou o erro.

## 5. Fazer o deploy

1. Clique em `Deploy`.
2. Aguarde a Vercel instalar as dependencias.
3. Quando aparecer o link final, abra o site.

Teste estes enderecos:

```text
https://seu-projeto.vercel.app/
https://seu-projeto.vercel.app/admin
```

No admin, entre com:

```text
E-mail: valor de AURA_ADMIN_EMAIL
Senha: valor de AURA_ADMIN_PASSWORD
```

## 6. Primeiro teste completo

1. Abra a pagina principal.
2. Preencha um diagnostico de teste.
3. Abra `/admin`.
4. Veja se o diagnostico apareceu.
5. Clique em `Ver relatorio`.
6. Use `Copiar prompt GPT`, se quiser personalizar.
7. Importe a resposta do GPT.
8. Clique em `Salvar relatorio`.
9. Clique em `Publicar relatorio`.
10. Clique em `Copiar link` e abra em uma janela anonima.

Se abrir na janela anonima, esta publicado para a cliente.

## 7. Se der erro

### Erro de login

Confira se `AURA_ADMIN_EMAIL` e `AURA_ADMIN_PASSWORD` foram configurados antes do deploy. Se voce alterar essas variaveis depois, faca um novo deploy.

### Erro 500 ao salvar diagnostico

Quase sempre e `DATABASE_URL` errada. Copie de novo a string do Neon e garanta que ela termina com algo como:

```text
?sslmode=require&channel_binding=require
```

### Diagnostico nao aparece depois de atualizar a pagina

Isso indica que o app nao esta usando o Neon. Verifique se `DATABASE_URL` existe na Vercel e faca redeploy.

### O projeto abriu, mas sem dados antigos

Normal. Os diagnosticos antigos que estavam no SQLite local ou no Render nao sao transferidos automaticamente para o Neon. Para iniciar sem custo, a base nova comeca vazia.

## 8. Como atualizar depois

Sempre que voce editar arquivos:

1. Suba as alteracoes no GitHub.
2. A Vercel faz novo deploy automaticamente.
3. O Neon preserva os diagnosticos.

