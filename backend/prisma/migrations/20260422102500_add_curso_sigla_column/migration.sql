-- Reconcile migration history with current database state
ALTER TABLE "Curso"
ADD COLUMN IF NOT EXISTS "sigla" TEXT;
