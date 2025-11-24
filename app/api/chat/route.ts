import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = "https://tunaligokalp.app.n8n.cloud/webhook/1dc6516f-2b39-4c04-912c-eb199c1d048e";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId, timestamp } = body;

    console.log('Proxying message to n8n:', {
      message,
      sessionId,
      timestamp
    });

    // Forward request to n8n webhook with session ID
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId,
        timestamp,
      }),
    });

    console.log('n8n response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n error:', errorText);
      return NextResponse.json(
        { error: 'n8n webhook failed', details: errorText },
        { status: response.status }
      );
    }

    // Try to parse as JSON first, fallback to text
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      console.log('n8n response data (JSON):', data);
    } else {
      // Response is plain text
      const textResponse = await response.text();
      console.log('n8n response data (TEXT):', textResponse);
      data = {
        response: textResponse,
        message: textResponse,
        output: textResponse
      };
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat proxy error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
