-- Uruchom to w Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS daily_overrides (
  date       DATE PRIMARY KEY,
  "start"    TEXT NOT NULL,
  "end"      TEXT NOT NULL,
  enabled    BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tylko admin (service role) może modyfikować
ALTER TABLE daily_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access"
  ON daily_overrides
  FOR ALL
  USING (true)
  WITH CHECK (true);
