# Publicar o AURA Diagnóstico no Render

Este guia é para publicar o sistema completo na internet usando Render.

## O Que Você Vai Precisar

- Uma conta no GitHub.
- Uma conta no Render: https://render.com
- A pasta deste projeto: `aura-diagnostico-unificado`.

## Antes De Começar

O sistema usa um banco SQLite. No Render, esse banco precisa ficar em um disco persistente.

Use esta configuração:

- Disk mount path: `/var/data`
- Variável `DB_PATH`: `/var/data/aura.sqlite`

Sem o disco persistente, os diagnósticos podem ser perdidos quando o serviço reiniciar.

## Passo 1: Subir O Projeto Para O GitHub

1. Entre no GitHub.
2. Crie um novo repositório.
3. Nome sugerido:

```text
aura-diagnostico-unificado
```

4. Suba os arquivos desta pasta para o repositório.

Não suba:

- `node_modules`
- arquivos `.sqlite`
- `.env`

O arquivo `.gitignore` já foi criado para ajudar com isso.

## Passo 2: Criar O Web Service No Render

1. Entre em https://dashboard.render.com
2. Clique em `New`.
3. Escolha `Web Service`.
4. Conecte sua conta do GitHub.
5. Selecione o repositório `aura-diagnostico-unificado`.

Na configuração do serviço, preencha:

```text
Name: aura-diagnostico
Runtime: Node
Build Command: npm install
Start Command: npm start
```

Escolha uma região próxima. Se tiver opção de São Paulo, use. Se não tiver, use a mais próxima disponível.

## Passo 3: Configurar Variáveis De Ambiente

Na tela do serviço, procure por `Environment` ou `Environment Variables`.

Adicione:

```text
SESSION_SECRET=uma-frase-grande-secreta-com-varios-caracteres
AURA_ADMIN_EMAIL=seu-email@seudominio.com
AURA_ADMIN_PASSWORD=uma-senha-forte
DB_PATH=/var/data/aura.sqlite
NODE_VERSION=24
```

Use uma senha forte. Essa será a senha do painel admin.

## Passo 4: Criar O Persistent Disk

No Render, dentro do Web Service:

1. Vá em `Disks`.
2. Clique em `Add Disk`.
3. Configure:

```text
Name: aura-data
Mount Path: /var/data
Size: 1 GB
```

4. Salve.

O Render vai fazer um novo deploy.

## Passo 5: Fazer O Deploy

Depois de salvar tudo, o Render deve iniciar o deploy automaticamente.

Quando terminar, ele vai mostrar uma URL parecida com:

```text
https://aura-diagnostico.onrender.com
```

Teste:

```text
https://aura-diagnostico.onrender.com/
https://aura-diagnostico.onrender.com/admin
```

## Passo 6: Usar O Sistema No Ar

1. Cliente responde o diagnóstico pelo link público.
2. Você entra no admin:

```text
https://aura-diagnostico.onrender.com/admin
```

3. Abre o diagnóstico.
4. Clica em `Copiar prompt GPT`.
5. Cola no ChatGPT.
6. Copia o JSON refinado.
7. Cola no campo de resposta GPT no admin.
8. Clica em `Importar resposta GPT`.
9. Clica em `Salvar relatório`.
10. Clica em `Publicar relatório`.
11. Clica em `Copiar link`.

O link da cliente ficará parecido com:

```text
https://aura-diagnostico.onrender.com/relatorio/1-nome-da-cliente
```

## Passo 7: Domínio Próprio

Depois que estiver funcionando no link do Render, você pode conectar um domínio.

Exemplo:

```text
diagnostico.aurafotografia.com.br
```

No Render:

1. Vá em `Settings`.
2. Procure `Custom Domains`.
3. Adicione o subdomínio.
4. O Render vai mostrar quais registros DNS você precisa criar no seu provedor de domínio.

## Observações Importantes

- Não use a senha padrão `aura123` em produção.
- Não remova o Persistent Disk depois de começar a usar.
- Faça backup periódico do banco, principalmente antes de alterações grandes.
- Se trocar `AURA_ADMIN_PASSWORD` depois que o admin já foi criado, a senha antiga continua no banco. Para trocar senha depois, será preciso criar uma rotina de alteração ou resetar o admin.
