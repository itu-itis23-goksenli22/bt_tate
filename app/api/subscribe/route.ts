import { createClient } from '@supabase/supabase-js';
import { generateWebinarEmailHTML } from '@/lib/email-template';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Supabase client with service role
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Resend API (or you can use SendGrid, AWS SES, etc.)
const RESEND_API_KEY = process.env.RESEND_API_KEY;

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

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('email_subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      // If already subscribed and link not sent, resend
      if (!existingSubscriber.webinar_link_sent) {
        await sendWebinarEmail(email, name);

        await supabase
          .from('email_subscribers')
          .update({
            webinar_link_sent: true,
            webinar_link_sent_at: new Date().toISOString(),
          })
          .eq('email', email);
      }

      return NextResponse.json({
        message: 'Bu email adresi zaten kayıtlı. Webinar linki tekrar gönderildi.',
        alreadySubscribed: true,
      });
    }

    // Insert new subscriber
    const { data: newSubscriber, error: insertError } = await supabase
      .from('email_subscribers')
      .insert({
        email,
        name: name || null,
        source: 'landing_page',
        webinar_link_sent: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json(
        { error: 'Kayıt sırasında bir hata oluştu' },
        { status: 500 }
      );
    }

    // Send webinar email
    const emailSent = await sendWebinarEmail(email, name);

    if (emailSent) {
      // Update subscriber to mark email as sent
      await supabase
        .from('email_subscribers')
        .update({
          webinar_link_sent: true,
          webinar_link_sent_at: new Date().toISOString(),
        })
        .eq('id', newSubscriber.id);

      return NextResponse.json({
        message: 'Başarıyla kaydoldunuz! Email adresinizi kontrol edin.',
        success: true,
      });
    } else {
      return NextResponse.json({
        message: 'Kaydoldunuz ama email gönderilemedi. Lütfen destek ile iletişime geçin.',
        success: true,
        emailFailed: true,
      });
    }
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}

async function sendWebinarEmail(email: string, name?: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return false;
  }

  try {
    const htmlContent = generateWebinarEmailHTML(name);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AI Scale <noreply@aiscale.app>',
        to: [email],
        subject: '🎉 AI Scale Ücretsiz Webinar - Kaydınız Alındı!',
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return false;
    }

    const data = await response.json();
    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
