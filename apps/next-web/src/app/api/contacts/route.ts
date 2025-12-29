import { NextResponse } from 'next/server';
import { contactsApi } from '@foclupus/api-client';

export async function GET() {
  try {
    const contacts = await contactsApi.getContacts();
    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const newContact = await contactsApi.createContact({ name, email, subject, message });
    return NextResponse.json({ contact: newContact });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}