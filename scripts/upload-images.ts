import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
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

async function uploadImage(filePath: string, storagePath: string) {
  const fileBuffer = fs.readFileSync(filePath)
  const fileName = path.basename(storagePath)

  // Get file extension for content type
  const ext = path.extname(fileName).toLowerCase()
  const contentTypeMap: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  }

  const { data, error } = await supabase.storage
    .from('images')
    .upload(storagePath, fileBuffer, {
      contentType: contentTypeMap[ext] || 'image/png',
      upsert: true
    })

  if (error) {
    console.error(`Error uploading ${storagePath}:`, error)
    return false
  }

  console.log(`✓ Uploaded: ${storagePath}`)
  return true
}

async function main() {
  console.log('Starting image upload to Supabase...\n')

  // Upload the existing image
  await uploadImage('./Untitled design.png', 'logo.png')

  console.log('\nUpload complete!')
  console.log('\nNext steps:')
  console.log('1. Go to Supabase Dashboard > Storage > images bucket')
  console.log('2. Make sure the bucket is set to public')
  console.log('3. Add more images as needed')
}

main()
