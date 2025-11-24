import { createClient } from '@supabase/supabase-js';
import { generateWebinarEmailHTML } from '@/lib/email-template';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Supabase client with service role
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi girin' },
        { status: 400 }
      );
    }

    console.log('📧 Processing subscription request for:', email);

    // Send email first (priority!)
    const emailSent = await sendWebinarEmail(email, name);

    if (!emailSent) {
      console.error('❌ Failed to send email, but continuing...');
      return NextResponse.json({
        message: 'Email gönderilemedi. Lütfen tekrar deneyin veya destek ile iletişime geçin.',
        success: false,
        emailFailed: true,
      }, { status: 500 });
    }

    console.log('✅ Email sent successfully, now attempting Supabase insert...');

    // Try to save to Supabase (optional, non-blocking)
    try {
      // Check if email already exists
      const { data: existingSubscriber } = await supabase
        .from('email_subscribers')
        .select('*')
        .eq('email', email)
        .single();

      if (existingSubscriber) {
        console.log('ℹ️ Email already exists in database, updating...');
        await supabase
          .from('email_subscribers')
          .update({
            webinar_link_sent: true,
            webinar_link_sent_at: new Date().toISOString(),
          })
          .eq('email', email);
      } else {
        console.log('ℹ️ Inserting new subscriber to database...');
        await supabase
          .from('email_subscribers')
          .insert({
            email,
            name: name || null,
            source: 'landing_page',
            webinar_link_sent: true,
            webinar_link_sent_at: new Date().toISOString(),
          });
      }
      console.log('✅ Supabase operation completed');
    } catch (dbError) {
      // Database error is non-critical since email was already sent
      console.warn('⚠️ Supabase operation failed (non-critical):', dbError);
    }

    return NextResponse.json({
      message: 'Başarıyla kaydoldunuz! Email adresinizi kontrol edin.',
      success: true,
    });
  } catch (error) {
    console.error('❌ Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}

async function sendWebinarEmail(email: string, name?: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not configured');
    return false;
  }

  try {
    const htmlContent = generateWebinarEmailHTML(name);

    console.log('📧 Sending email via Resend SDK:', {
      from: 'AI Scale <info@aiscale.app>',
      to: email,
      subject: '🎉 AI Scale Ücretsiz Webinar - Kaydınız Alındı!',
      htmlLength: htmlContent.length,
    });

    const { data, error } = await resend.emails.send({
      from: 'AI Scale <info@aiscale.app>',
      to: [email],
      subject: '🎉 AI Scale Ücretsiz Webinar - Kaydınız Alındı!',
      html: htmlContent,
    });

    if (error) {
      console.error('❌ Resend SDK error:', JSON.stringify(error, null, 2));
      return false;
    }

    console.log('✅ Email sent successfully via Resend SDK:', data);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
}
