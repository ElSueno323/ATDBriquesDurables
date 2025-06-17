import { NextResponse } from 'next/server';
import { sendQuoteEmail } from '@/services/emailService';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validation des données
    const requiredFields = ['name', 'email', 'phone', 'message', 'address', 'surface'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }

    // Envoi de l'email
    const result = await sendQuoteEmail(data);
    
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du devis' },
      { status: 500 }
    );
  }
} 