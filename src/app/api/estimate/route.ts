/**
 * @fileoverview Estimate request API route handler
 * @description Handles estimate/quote request submissions from the estimate modal.
 * Validates input data and sends detailed project estimate emails.
 */

import { NextResponse } from 'next/server';
import { sendEstimateEmail } from '@/services/emailService';

/**
 * Estimate request form data interface
 */
interface EstimateFormData {
  name: string;
  email: string;
  phone?: string;
  description: string;
  company?: string;
}

/**
 * Handles POST requests to the estimate request endpoint
 * 
 * @route POST /api/estimate
 * @description Processes estimate/quote request submissions with validation and email sending
 * 
 * @param {Request} request - The incoming HTTP request containing form data
 * @returns {Promise<NextResponse>} JSON response with success/error status
 * 
 * @requestBody {EstimateFormData} JSON object containing:
 * - name: Client's full name (required)
 * - email: Client's email address (required)
 * - description: Project description and requirements (required)
 * - phone: Client's phone number (optional)
 * - company: Client's company name (optional)
 * 
 * @responses
 * - 200: Success - Estimate request email sent successfully
 *   ```json
 *   { "success": true, "messageId": "smtp-message-id" }
 *   ```
 * - 400: Bad Request - Missing required fields
 *   ```json
 *   { "error": "Les champs nom, email et description sont requis" }
 *   ```
 * - 500: Internal Server Error - Email sending failed
 *   ```json
 *   { "error": "Une erreur est survenue lors de l'envoi de la demande" }
 *   ```
 * 
 * @example
 * ```javascript
 * // Client-side usage
 * const response = await fetch('/api/estimate', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     name: 'Jane Smith',
 *     email: 'jane@company.com',
 *     phone: '+1234567890',
 *     company: 'Smith Construction',
 *     description: 'Need estimate for office building renovation, 5000 sq ft'
 *   })
 * });
 * ```
 * 
 * @dependencies
 * - sendEstimateEmail: Email service function for sending estimate request emails
 * - NextResponse: Next.js response utility for API routes
 * 
 * @security
 * - Input validation for required fields
 * - Email format validation handled by HTML5 input type
 * - No authentication required (public estimate form)
 * - Optional fields are safely handled with fallbacks
 */
export async function POST(request: Request) {
  try {
    // Parse JSON body from request
    const data = await request.json();
    
    // Validate required fields
    const { name, email, phone, description, company }: EstimateFormData = data;
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Les champs nom, email et description sont requis' },
        { status: 400 }
      );
    }

    // Send estimate request email via email service
    const result = await sendEstimateEmail({ 
      name, 
      email, 
      phone: phone || '', 
      description, 
      company: company || undefined 
    });
    
    // Return success response with message ID
    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (error) {
    // Log error for debugging (avoid exposing sensitive details)
    console.error('Erreur lors du traitement de la demande d\'estimation:', error);
    
    // Return generic error response
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de la demande' },
      { status: 500 }
    );
  }
} 