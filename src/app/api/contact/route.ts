/**
 * @fileoverview Contact form API route handler
 * @description Handles contact form submissions from the website contact form.
 * Validates input data and sends emails via the email service.
 */

import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/services/emailService';

/**
 * Contact form data interface
 */
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Handles POST requests to the contact form endpoint
 * 
 * @route POST /api/contact
 * @description Processes contact form submissions with validation and email sending
 * 
 * @param {Request} request - The incoming HTTP request containing form data
 * @returns {Promise<NextResponse>} JSON response with success/error status
 * 
 * @requestBody {ContactFormData} JSON object containing:
 * - name: Contact person's full name (required)
 * - email: Contact person's email address (required)
 * - message: The message content (required)
 * 
 * @responses
 * - 200: Success - Email sent successfully
 *   ```json
 *   { "success": true, "messageId": "smtp-message-id" }
 *   ```
 * - 400: Bad Request - Missing required fields
 *   ```json
 *   { "error": "Tous les champs (nom, email, message) sont requis" }
 *   ```
 * - 500: Internal Server Error - Email sending failed
 *   ```json
 *   { "error": "Une erreur est survenue lors de l'envoi du message" }
 *   ```
 * 
 * @example
 * ```javascript
 * // Client-side usage
 * const response = await fetch('/api/contact', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *     message: 'Hello, I need information about your services.'
 *   })
 * });
 * ```
 * 
 * @dependencies
 * - sendContactEmail: Email service function for sending contact emails
 * - NextResponse: Next.js response utility for API routes
 * 
 * @security
 * - Input validation for required fields
 * - Email format validation handled by HTML5 input type
 * - No authentication required (public contact form)
 */
export async function POST(request: Request) {
  try {
    // Parse JSON body from request
    const data = await request.json();
    
    // Validate required fields
    const { name, email, message }: ContactFormData = data;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs (nom, email, message) sont requis' },
        { status: 400 }
      );
    }

    // Send contact email via email service
    const result = await sendContactEmail({ name, email, message });
    
    // Return success response with message ID
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    // Log error for debugging (avoid exposing sensitive details)
    console.error('Erreur lors du traitement de la demande de contact:', error);
    
    // Return generic error response
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    );
  }
} 