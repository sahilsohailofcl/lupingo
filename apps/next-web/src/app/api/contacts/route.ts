import { NextResponse } from 'next/server';
import { db } from '@foclupus/api-client/server';
import { contacts } from '@foclupus/api-client/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Fetch all contacts
    const allContacts = await db.select().from(contacts);

    return NextResponse.json({ contacts: allContacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Insert using Drizzle
    const newContact = await db.insert(contacts).values({
      name,
      email,
      subject,
      message,
    }).returning();

    return NextResponse.json({ contact: newContact[0] });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}