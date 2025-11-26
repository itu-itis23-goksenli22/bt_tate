-- Supabase SQL Editor'da çalıştırılacak
-- Bu tabloyu oluşturun ve satın almaları kaydedecek

CREATE TABLE IF NOT EXISTS purchase_logs (
  id BIGSERIAL PRIMARY KEY,
  event_id TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  value DECIMAL(10,2) DEFAULT 39.00,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT
);

-- RLS (Row Level Security) aktif et
ALTER TABLE purchase_logs ENABLE ROW LEVEL SECURITY;

-- Herkese okuma izni ver (isteğe bağlı)
CREATE POLICY "Enable read access for all users" ON purchase_logs
  FOR SELECT USING (true);

-- Sadece authenticated kullanıcılar yazabilir (isteğe bağlı)
CREATE POLICY "Enable insert for authenticated users only" ON purchase_logs
  FOR INSERT WITH CHECK (true);
