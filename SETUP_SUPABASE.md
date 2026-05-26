# Configurando Backend e Painel Web

Este projeto agora pode funcionar de dois jeitos:

- Sem Supabase configurado: salva dados localmente no celular com AsyncStorage.
- Com Supabase configurado: salva cadastros e entregas online, compartilhados entre aparelhos.

## 1. Criar o projeto no Supabase

1. Acesse https://supabase.com e crie um projeto.
2. No painel do projeto, abra SQL Editor.
3. Copie o conteúdo de `supabase/schema.sql`.
4. Execute o SQL.

Isso cria as tabelas:

- `usuarios`: famílias e instituições.
- `entregas`: histórico de entregas.

## 2. Configurar o app mobile

1. Copie `.env.example` para `.env`.
2. Preencha:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
```

3. Reinicie o Expo com cache limpo:

```powershell
npx.cmd expo start --clear --lan --port 8081
```

## 3. Configurar o painel web admin

1. Copie `admin/config.example.js` para `admin/config.js`.
2. Preencha `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
3. Abra `admin/index.html` no navegador.

O painel mostra:

- Quantidade de famílias.
- Quantidade de instituições.
- Quantidade de entregas.
- Lista de cadastros.
- Histórico de entregas.

## Observação de segurança

Esta configuração é adequada para MVP, teste e apresentação.

Para produção, o ideal é adicionar autenticação de administrador no painel web e trocar as políticas públicas por regras mais restritas no Supabase. Também é importante não salvar senha em texto puro.