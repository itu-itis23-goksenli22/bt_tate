-- Create email_subscribers table
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  webinar_link_sent BOOLEAN DEFAULT FALSE,
  webinar_link_sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT DEFAULT 'landing_page',
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON public.email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_subscribed_at ON public.email_subscribers(subscribed_at DESC);

-- Enable Row Level Security
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON public.email_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow service role to read/update
CREATE POLICY "Allow service role full access" ON public.email_subscribers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add comment
COMMENT ON TABLE public.email_subscribers IS 'Stores email subscribers from the landing page webinar registration form';
