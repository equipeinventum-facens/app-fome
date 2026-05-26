create table if not exists public.usuarios (
  id bigint primary key,
  created_at timestamptz not null default now(),
  tipo text not null check (tipo in ('familia', 'instituicao')),
  nome text not null,
  cpf text,
  cnpj text,
  nome_instituicao text,
  pessoas text,
  endereco text,
  senha text not null,
  atendimento_aberto boolean not null default false,
  status text not null default 'pendente' check (status in ('pendente', 'aprovado', 'reprovado'))
);

create table if not exists public.entregas (
  id bigint primary key,
  created_at timestamptz not null default now(),
  familia_id bigint references public.usuarios(id) on delete set null,
  nome text not null,
  cpf text,
  pessoas text,
  endereco text,
  data text,
  hora text
);

alter table public.usuarios add column if not exists atendimento_aberto boolean not null default false;
alter table public.usuarios enable row level security;
alter table public.entregas enable row level security;

drop policy if exists "Permitir leitura anonima de usuarios" on public.usuarios;
drop policy if exists "Permitir criacao anonima de usuarios" on public.usuarios;
drop policy if exists "Permitir atualizacao anonima de usuarios" on public.usuarios;
drop policy if exists "Permitir leitura anonima de entregas" on public.entregas;
drop policy if exists "Permitir criacao anonima de entregas" on public.entregas;

create policy "Permitir leitura anonima de usuarios"
on public.usuarios for select
to anon
using (true);

create policy "Permitir criacao anonima de usuarios"
on public.usuarios for insert
to anon
with check (true);

create policy "Permitir atualizacao anonima de usuarios"
on public.usuarios for update
to anon
using (true)
with check (true);

create policy "Permitir leitura anonima de entregas"
on public.entregas for select
to anon
using (true);

create policy "Permitir criacao anonima de entregas"
on public.entregas for insert
to anon
with check (true);



