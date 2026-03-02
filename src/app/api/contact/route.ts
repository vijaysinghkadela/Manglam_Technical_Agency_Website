import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.email || !body.service || !body.message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    console.log('=== New Contact Form Submission ===');
    console.log('Name:', body.fullName);
    console.log('Email:', body.email);
    console.log('Phone:', body.phone || 'Not provided');
    console.log('Company:', body.company || 'Not provided');
    console.log('Service:', body.service);
    console.log('Budget:', body.budget);
    console.log('Timeline:', body.timeline);
    console.log('Referral:', body.referralSource);
    console.log('Message:', body.message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('===================================');

    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will get back to you within 2–4 hours.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}
