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

    // TODO: forward to CRM / email provider (Resend / HubSpot)
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
