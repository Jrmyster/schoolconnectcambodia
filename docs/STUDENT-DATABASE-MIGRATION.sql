-- Run only against a backed-up, independent STEM database copied from the baseline.
-- Fresh installations can use the current Drizzle schema directly.
-- This preserves legacy affiliation identifiers while removing every cross-table FK.
BEGIN;
ALTER TABLE users ADD COLUMN IF NOT EXISTS province text;
DO $$
DECLARE fk record;
BEGIN
  IF to_regclass('public.schools') IS NOT NULL THEN
    EXECUTE 'UPDATE users u SET province=s.province FROM schools s WHERE u.school_id=s.id AND u.province IS NULL';
  END IF;
  FOR fk IN
    SELECT conname FROM pg_constraint WHERE conrelid='public.users'::regclass
      AND contype='f' AND confrelid=to_regclass('public.schools')
  LOOP
    EXECUTE format('ALTER TABLE users DROP CONSTRAINT %I',fk.conname);
  END LOOP;
END $$;
COMMIT;
-- No table or user data is deleted by this migration.
-- Import only student accounts, reset tokens and STEM-owned data into the final STEM database.
