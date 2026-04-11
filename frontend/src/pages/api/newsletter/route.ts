import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !/\S+@\S+\.\S+/.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // TODO: forward to email provider (Resend / Mailchimp)
    return NextResponse.json(
      { success: true, message: 'Thanks for subscribing!' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Subscription failed. Please try again.' },
      { status: 500 }
    );
  }
}
