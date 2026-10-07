CREATE TABLE IF NOT EXISTS public.stem_sessions (
  sid varchar PRIMARY KEY,
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
);
CREATE INDEX IF NOT EXISTS stem_sessions_expire_idx ON public.stem_sessions(expire);
