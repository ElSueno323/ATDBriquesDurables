import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  address: string;
  surface: string;
}

interface ContactData {
  name: string;
  email: string;
  message: string;
}

interface EstimateData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  description: string;
}

export async function sendQuoteEmail(data: EmailData) {
  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Préparer le contenu de l'email
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.NEXT_PUBLIC_QUOTE_EMAIL,
    subject: process.env.NEXT_PUBLIC_QUOTE_SUBJECT,
    html: `
      <h2>Nouvelle demande de devis</h2>
      <p><strong>Nom:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Téléphone:</strong> ${data.phone}</p>
      <p><strong>Adresse:</strong> ${data.address}</p>
      <p><strong>Surface:</strong> ${data.surface}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  };

  try {
    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
}

export async function sendContactEmail(data: ContactData) {
  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Préparer le contenu de l'email
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: 'Nouveau message de contact - ATD Briques Durables',
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  };

  try {
    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email de contact envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de contact:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email de contact');
  }
} 

export async function sendEstimateEmail(data: EstimateData) {
  // Créer un transporteur SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Préparer le contenu de l'email
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: 'Nouvelle demande d\'estimation - ATD Briques Durables',
    html: `
      <h2>Nouvelle demande de devis</h2>
      <p><strong>Nom:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Téléphone:</strong> ${data.phone}</p>
      ${data.company ? `<p><strong>Entreprise:</strong> ${data.company}</p>` : ''}
      <p><strong>Description du projet:</strong></p>
      <p>${data.description}</p>
    `,
  };

  try {
    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email d\'estimation envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email d\'estimation:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email d\'estimation');
  }
}