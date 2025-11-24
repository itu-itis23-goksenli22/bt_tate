import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

// Use service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createBucket() {
  console.log('Creating images bucket in Supabase...\n')

  // Create the bucket
  const { data, error } = await supabase.storage.createBucket('images', {
    public: true,
    fileSizeLimit: 52428800, // 50MB
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp']
  })

  if (error) {
    if (error.message.includes('already exists')) {
      console.log('✓ Bucket "images" already exists')
      return true
    }
    console.error('Error creating bucket:', error)
    return false
  }

  console.log('✓ Bucket "images" created successfully')
  console.log('\nBucket configuration:')
  console.log('  - Public: Yes')
  console.log('  - Max file size: 50MB')
  console.log('  - Allowed types: PNG, JPEG, GIF, SVG, WebP')
  return true
}

async function main() {
  const success = await createBucket()

  if (success) {
    console.log('\n✅ Setup complete! You can now run:')
    console.log('   npm run upload-images')
  } else {
    console.log('\n❌ Failed to create bucket. Please check your Supabase credentials.')
    process.exit(1)
  }
}

main()
