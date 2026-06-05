-- Operator Mode contacts table migration
CREATE TABLE IF NOT EXISTS public.contacts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  service    TEXT NOT NULL,
  budget     TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_service_idx ON public.contacts (service);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Table-level privileges (required alongside RLS policies)
GRANT SELECT, INSERT ON public.contacts TO anon, authenticated;
GRANT ALL ON public.contacts TO service_role;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.contacts;

-- Public can submit inquiries only
CREATE POLICY "Allow anonymous insert"
  ON public.contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated admins can read
CREATE POLICY "Allow authenticated read"
  ON public.contacts FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admins can delete
CREATE POLICY "Allow authenticated delete"
  ON public.contacts FOR DELETE
  TO authenticated
  USING (true);
