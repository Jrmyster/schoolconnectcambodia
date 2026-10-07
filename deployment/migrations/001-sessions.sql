CREATE TABLE IF NOT EXISTS public.map_sessions (
  sid varchar PRIMARY KEY,
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
);
CREATE INDEX IF NOT EXISTS map_sessions_expire_idx ON public.map_sessions(expire);
