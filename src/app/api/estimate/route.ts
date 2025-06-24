import { NextResponse } from 'next/server';
import { sendEstimateEmail } from '@/services/emailService';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validation des données
    const { name, email, phone, description, company } = data;
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Les champs nom, email et description sont requis' },
        { status: 400 }
      );
    }

    // Envoi de l'email
    const result = await sendEstimateEmail({ 
      name, 
      email, 
      phone: phone || '', 
      description, 
      company: company || undefined 
    });
    
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Erreur lors du traitement de la demande d\'estimation:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de la demande' },
      { status: 500 }
    );
  }
} 