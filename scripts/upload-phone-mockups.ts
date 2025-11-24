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

  // Get file extension for content type
  const ext = path.extname(filePath).toLowerCase()
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
      contentType: contentTypeMap[ext] || 'image/jpeg',
      upsert: true
    })

  if (error) {
    console.error(`❌ Error uploading ${storagePath}:`, error.message)
    return false
  }

  console.log(`✅ Uploaded: ${storagePath}`)
  return true
}

async function main() {
  console.log('Starting phone mockup upload to Supabase...\n')

  // Upload phone mockup images
  const uploads = [
    {
      local: '/Users/bahakizil/Downloads/WhatsApp Image 2025-11-24 at 15.55.25.jpeg',
      remote: 'mockups/phone-dashboard.jpg',
      description: 'AI SCALE Dashboard (Spaces, Feed, Members)'
    },
    {
      local: '/Users/bahakizil/Downloads/WhatsApp Image 2025-11-24 at 15.55.25 (1).jpeg',
      remote: 'mockups/phone-course.jpg',
      description: 'AI SCALE Masterclass Course Screen'
    }
  ]

  for (const upload of uploads) {
    console.log(`📤 Uploading ${upload.description}...`)
    const success = await uploadImage(upload.local, upload.remote)
    if (!success) {
      console.error(`Failed to upload ${upload.description}`)
    }
  }

  console.log('\n✅ Upload complete!')
  console.log('\nUploaded images:')
  console.log('- mockups/phone-dashboard.jpg (Dashboard)')
  console.log('- mockups/phone-course.jpg (Course Screen)')
  console.log('\nYou can now use these in your components!')
}

main()
