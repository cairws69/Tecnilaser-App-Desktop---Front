# Tecnilaser - Sistema de Gestão

Sistema completo de gestão de clientes e aparelhos com assistente IA integrado.

## 🚀 Funcionalidades

- ✅ Cadastro de clientes com IDs numéricos
- ✅ Gestão de aparelhos/dispositivos
- ✅ Status e acompanhamento de reparos
- ✅ Assistente IA integrado via webhook
- ✅ Banco de dados PostgreSQL (Supabase)
- ✅ Interface Electron Desktop

## 📋 Pré-requisitos

- Node.js 16+ instalado
- PostgreSQL ou conta Supabase
- Servidor de webhook rodando (para o assistente IA)

## 🔧 Instalação

### 1. Clone e instale dependências

```bash
npm install
```

### 2. Configure o banco de dados

Crie um arquivo `.env` na raiz do projeto:

```env
# Conexão principal (com connection pooling)
DATABASE_URL="postgresql://usuario:senha@host:5432/tecnilaser?pgbouncer=true"

# Conexão direta (para migrations)
DIRECT_URL="postgresql://usuario:senha@host:5432/tecnilaser"
```

### 3. Execute as migrations

```bash
npm run prisma:push
```

### 4. (Opcional) Gere o cliente Prisma

```bash
npm run prisma:generate
```

## 🎯 Executando o projeto

### Modo Desenvolvimento (Web)

```bash
npm run dev
```

Acesse: http://localhost:5173

### Modo Electron (Desktop)

```bash
npm run electron:dev
```

## 🤖 Configurando o Assistente IA

### URL do Webhook

O assistente IA está configurado para enviar mensagens para:

```
http://localhost:8080/webhook/a8ce8bd0-901f-4776-8ced-04510abb165f
```

### Formato da Requisição

```javascript
POST /webhook/a8ce8bd0-901f-4776-8ced-04510abb165f
Content-Type: application/json

{
  "message": "Sua pergunta aqui",
  "timestamp": "2025-01-20T10:30:00Z"
}
```

### Formato da Resposta Esperada

```javascript
{
  "message": "Resposta do assistente",
  // ou
  "response": "Resposta do assistente"
}
```

### Alterando a URL do Webhook

Edite o arquivo `src/services/chatService.js`:

```javascript
const CHAT_API_URL = 'SUA_URL_AQUI';
```

## 📊 Estrutura do Banco de Dados

### Tabela: clients

- `id` (String CUID) - ID único do sistema
- `numericId` (Int Auto-increment) - ID numérico para usuário
- `name` (String) - Nome completo
- `email` (String) - Email
- `phone` (String) - Telefone
- `dateOfBirth` (String?) - Data de nascimento
- `rg` (String?) - RG
- `postalCode` (String?) - CEP
- `address` (String?) - Endereço
- `neighborhood` (String?) - Bairro
- `city` (String?) - Cidade
- `state` (String?) - Estado
- `registrationDate` (String) - Data de cadastro

### Tabela: devices

- `id` (String CUID) - ID único do sistema
- `numericId` (Int Auto-increment) - ID numérico para usuário
- `clientId` (String) - Relação com cliente
- `device` (String) - Tipo de aparelho
- `model` (String?) - Modelo
- `defect` (String) - Defeito relatado
- `voltage` (String) - Voltagem (110/220)
- `repair` (String?) - Conserto realizado
- `budget` (String?) - Orçamento
- `status` (String) - Status atual
- `downloaded` (Boolean) - Se foi baixado

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento web
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Desenvolvimento Electron
npm run electron:dev

# Prisma Studio (visualizar BD)
npm run prisma:studio

# Atualizar schema do banco
npm run prisma:push

# Gerar cliente Prisma
npm run prisma:generate
```

## 📁 Estrutura de Pastas

```
tecnilaser/
├── backend/
│   ├── database.js      # Configuração Prisma
│   ├── routes.js        # Rotas da API
│   └── server.js        # Servidor Express
├── electron/
│   └── main.js          # Configuração Electron
├── prisma/
│   └── schema.prisma    # Schema do banco
├── src/
│   ├── components/      # Componentes React
│   ├── services/        # Serviços (API, Chat)
│   ├── App.jsx         # App principal
│   └── main.jsx        # Entry point
└── public/             # Assets estáticos
```

## 🔍 Troubleshooting

### Erro de conexão com o banco de dados

Verifique se as variáveis `DATABASE_URL` e `DIRECT_URL` estão corretas no `.env`.

### Assistente IA não responde

1. Verifique se o servidor webhook está rodando
2. Confirme a URL em `src/services/chatService.js`
3. Veja o console do navegador para erros de rede

### IDs numéricos não aparecem

Execute a migration novamente:

```bash
npm run prisma:push
```

## 📝 Licença

MIT

## 👥 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.