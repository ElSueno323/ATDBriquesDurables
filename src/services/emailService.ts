/**
 * @fileoverview Email service for sending various types of emails via SMTP
 * @description Centralized email service using Nodemailer for contact forms,
 * estimate requests, and quote submissions. Handles SMTP configuration and email templates.
 */

import nodemailer from 'nodemailer';

/**
 * Quote email data interface (legacy - for future quote functionality)
 */
interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  address: string;
  surface: string;
}

/**
 * Contact form data interface
 */
interface ContactData {
  name: string;
  email: string;
  message: string;
}

/**
 * Estimate request data interface
 */
interface EstimateData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  description: string;
}

/**
 * Email sending result interface
 */
interface EmailResult {
  success: boolean;
  messageId: string;
}

/**
 * Creates and configures SMTP transporter
 * @returns {nodemailer.Transporter} Configured SMTP transporter
 * 
 * @dependencies
 * Environment variables required:
 * - SMTP_HOST: SMTP server hostname
 * - SMTP_PORT: SMTP server port (usually 587 for TLS)
 * - SMTP_USER: SMTP username/email
 * - SMTP_PASSWORD: SMTP password or app-specific password
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // Use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

/**
 * Sends quote request email (legacy function for future development)
 * 
 * @param {EmailData} data - Quote request data
 * @returns {Promise<EmailResult>} Email sending result
 * 
 * @description Sends detailed quote requests with project specifications.
 * Currently unused but prepared for future quote functionality.
 * 
 * @example
 * ```typescript
 * const result = await sendQuoteEmail({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   phone: '+1234567890',
 *   address: '123 Main St, City',
 *   surface: '2000 sq ft',
 *   message: 'Need quote for renovation project'
 * });
 * ```
 * 
 * @throws {Error} When SMTP configuration is invalid or email sending fails
 */
export async function sendQuoteEmail(data: EmailData): Promise<EmailResult> {
  // Create SMTP transporter
  const transporter = createTransporter();

  // Prepare email content with HTML template
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
    // Send email via SMTP
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }
}

/**
 * Sends contact form submission email
 * 
 * @param {ContactData} data - Contact form data
 * @returns {Promise<EmailResult>} Email sending result
 * 
 * @description Sends basic contact form submissions from the website contact page.
 * Includes sender information and message content.
 * 
 * @example
 * ```typescript
 * const result = await sendContactEmail({
 *   name: 'Jane Smith',
 *   email: 'jane@example.com',
 *   message: 'I would like more information about your services.'
 * });
 * ```
 * 
 * @throws {Error} When SMTP configuration is invalid or email sending fails
 */
export async function sendContactEmail(data: ContactData): Promise<EmailResult> {
  // Create SMTP transporter
  const transporter = createTransporter();

  // Prepare email content with HTML template
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER, // Send to company email
    subject: 'Nouveau message de contact - ATD Briques',
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  };

  try {
    // Send email via SMTP
    const info = await transporter.sendMail(mailOptions);
    console.log('Email de contact envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de contact:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email de contact');
  }
} 

/**
 * Sends estimate/quote request email with detailed project information
 * 
 * @param {EstimateData} data - Estimate request data
 * @returns {Promise<EmailResult>} Email sending result
 * 
 * @description Sends detailed estimate requests from the estimate modal.
 * Includes client information, company details, and project description.
 * 
 * @example
 * ```typescript
 * const result = await sendEstimateEmail({
 *   name: 'Bob Johnson',
 *   email: 'bob@construction.com',
 *   phone: '+1234567890',
 *   company: 'Johnson Construction',
 *   description: 'Office building renovation, 10,000 sq ft, need timeline and cost estimate'
 * });
 * ```
 * 
 * @throws {Error} When SMTP configuration is invalid or email sending fails
 */
export async function sendEstimateEmail(data: EstimateData): Promise<EmailResult> {
  // Create SMTP transporter
  const transporter = createTransporter();

  // Prepare email content with HTML template
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER, // Send to company email
    subject: 'Nouvelle demande d\'estimation - ATD Briques',
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
    // Send email via SMTP
    const info = await transporter.sendMail(mailOptions);
    console.log('Email d\'estimation envoyé:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email d\'estimation:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email d\'estimation');
  }
}