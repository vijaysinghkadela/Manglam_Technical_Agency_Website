import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.services?.length || !body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    console.log('=== New Quote Request ===');
    console.log('Services:', body.services.join(', '));
    console.log('Budget:', body.budget);
    console.log('Timeline:', body.timeline);
    console.log('Description:', body.description);
    console.log('Name:', body.name);
    console.log('Email:', body.email);
    console.log('Phone:', body.phone || 'Not provided');
    console.log('Company:', body.company || 'Not provided');
    console.log('Timestamp:', new Date().toISOString());
    console.log('=========================');

    return NextResponse.json(
      { success: true, message: 'Quote request received. We will get back to you within 24 hours.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
