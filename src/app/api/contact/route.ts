import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/services/emailService';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validation des données
    const { name, email, message } = data;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs (nom, email, message) sont requis' },
        { status: 400 }
      );
    }

    // Envoi de l'email
    const result = await sendContactEmail({ name, email, message });
    
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Erreur lors du traitement de la demande de contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    );
  }
} 