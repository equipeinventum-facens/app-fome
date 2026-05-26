import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  isSupabaseConfigured,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
} from "../config/supabase";

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

function tableUrl(table, query = "") {
  return `${SUPABASE_URL}/rest/v1/${table}${query}`;
}

function normalizeUsuario(usuario) {
  if (!usuario) return usuario;

  return {
    ...usuario,
    nomeInstituicao: usuario.nomeInstituicao ?? usuario.nome_instituicao,
    atendimentoAberto: usuario.atendimentoAberto ?? usuario.atendimento_aberto,
  };
}

function normalizeEntrega(entrega) {
  if (!entrega) return entrega;

  return {
    ...entrega,
    familiaId: entrega.familiaId ?? entrega.familia_id,
  };
}

function toDbUsuario(usuario) {
  return {
    id: usuario.id,
    tipo: usuario.tipo,
    nome: usuario.nome,
    cpf: usuario.cpf || null,
    cnpj: usuario.cnpj || null,
    nome_instituicao: usuario.nomeInstituicao || null,
    pessoas: usuario.pessoas || null,
    endereco: usuario.endereco || null,
    senha: usuario.senha,
    atendimento_aberto: Boolean(usuario.atendimentoAberto),
  };
}

function toDbEntrega(entrega) {
  return {
    id: entrega.id,
    familia_id: entrega.familiaId,
    nome: entrega.nome,
    cpf: entrega.cpf || null,
    pessoas: entrega.pessoas || null,
    endereco: entrega.endereco || null,
    data: entrega.data,
    hora: entrega.hora,
  };
}

async function request(table, options = {}, query = "") {
  const response = await fetch(tableUrl(table, query), {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Erro ao acessar o Supabase.");
  }

  if (response.status === 204) return null;
  return response.json();
}

async function getLocalData() {
  const usuariosSalvos = await AsyncStorage.getItem("usuarios");
  const entregasSalvas = await AsyncStorage.getItem("entregas");

  return {
    usuarios: usuariosSalvos ? JSON.parse(usuariosSalvos) : [],
    entregas: entregasSalvas ? JSON.parse(entregasSalvas) : [],
  };
}

async function saveLocalData({ usuarios, entregas }) {
  await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
  await AsyncStorage.setItem("entregas", JSON.stringify(entregas));
}

export async function carregarDadosRemotos() {
  if (!isSupabaseConfigured) {
    return getLocalData();
  }

  const [usuarios, entregas] = await Promise.all([
    request("usuarios", { method: "GET" }, "?select=*&order=created_at.desc"),
    request("entregas", { method: "GET" }, "?select=*&order=created_at.desc"),
  ]);

  return {
    usuarios: usuarios.map(normalizeUsuario),
    entregas: entregas.map(normalizeEntrega),
  };
}

export async function salvarDadosLocais(dados) {
  if (isSupabaseConfigured) return;
  await saveLocalData(dados);
}

export async function criarUsuario(usuario) {
  if (!isSupabaseConfigured) return usuario;

  const [usuarioCriado] = await request("usuarios", {
    method: "POST",
    body: JSON.stringify(toDbUsuario(usuario)),
  });

  return normalizeUsuario(usuarioCriado);
}

export async function atualizarUsuario(usuario) {
  if (!isSupabaseConfigured) return usuario;

  const [usuarioAtualizado] = await request(
    "usuarios",
    {
      method: "PATCH",
      body: JSON.stringify(toDbUsuario(usuario)),
    },
    `?id=eq.${usuario.id}`,
  );

  return normalizeUsuario(usuarioAtualizado);
}

export async function criarEntrega(entrega) {
  if (!isSupabaseConfigured) return entrega;

  const [entregaCriada] = await request("entregas", {
    method: "POST",
    body: JSON.stringify(toDbEntrega(entrega)),
  });

  return normalizeEntrega(entregaCriada);
}
