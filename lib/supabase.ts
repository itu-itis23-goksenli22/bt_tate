import { createClient } from '@supabase/supabase-js'

let supabaseInstance: ReturnType<typeof createClient> | null = null;

const getSupabase = () => {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase env vars not configured, using placeholder');
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
};

// Export lazy getter instead of direct client
export const getSupabaseClient = () => getSupabase();

// Legacy export for compatibility (but will be null during build if env vars missing)
export const supabase = getSupabase();

// Helper function to get image URL from Supabase Storage
export const getImageUrl = (path: string): string => {
  try {
    const client = getSupabase();
    if (!client) {
      return `/placeholder/${path}`; // Return placeholder path during build
    }
    const { data } = client.storage.from('images').getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.warn('Failed to get image URL:', error);
    return `/placeholder/${path}`;
  }
}
