# API Documentation - ATD Briques

This document provides comprehensive information about the API endpoints available in the ATD Briques website.

## Overview

The ATD Briques API provides endpoints for handling contact forms, estimate requests, and quote submissions. All endpoints are built using Next.js API routes and handle email communication via SMTP.

### Base URL

```
https://your-domain.com/api
```

### Content Type

All API endpoints expect and return JSON data:

```
Content-Type: application/json
```

## Authentication

Currently, all API endpoints are public and do not require authentication. They are designed for contact forms and lead generation.

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (missing required fields)
- `500`: Internal Server Error (SMTP or server issues)

---

## Endpoints

### 1. Contact Form Submission

Submit a basic contact form message.

**Endpoint:** `POST /api/contact`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Contact person's full name |
| email | string | Yes | Contact person's email address |
| message | string | Yes | Message content |

#### Example Request

```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I would like more information about your construction services.'
  })
});
```

#### Success Response (200)

```json
{
  "success": true,
  "messageId": "smtp-message-id-string"
}
```

#### Error Responses

**400 Bad Request** - Missing required fields:
```json
{
  "error": "Tous les champs (nom, email, message) sont requis"
}
```

**500 Internal Server Error** - Email sending failed:
```json
{
  "error": "Une erreur est survenue lors de l'envoi du message"
}
```

---

### 2. Estimate Request Submission

Submit a detailed estimate/quote request with project information.

**Endpoint:** `POST /api/estimate`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Client's full name |
| email | string | Yes | Client's email address |
| description | string | Yes | Project description and requirements |
| phone | string | No | Client's phone number |
| company | string | No | Client's company name |

#### Example Request

```javascript
const response = await fetch('/api/estimate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@company.com',
    phone: '+1234567890',
    company: 'Smith Construction',
    description: 'Office building renovation project, approximately 5000 sq ft. Need timeline and cost estimate.'
  })
});
```

#### Success Response (200)

```json
{
  "success": true,
  "messageId": "smtp-message-id-string"
}
```

#### Error Responses

**400 Bad Request** - Missing required fields:
```json
{
  "error": "Les champs nom, email et description sont requis"
}
```

**500 Internal Server Error** - Email sending failed:
```json
{
  "error": "Une erreur est survenue lors de l'envoi de la demande"
}
```

---

### 3. Quote Request Submission (Future)

*Note: This endpoint exists in the codebase but is not currently used in the frontend. It's prepared for future quote functionality.*

**Endpoint:** `POST /api/send-quote`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Client's full name |
| email | string | Yes | Client's email address |
| phone | string | Yes | Client's phone number |
| message | string | Yes | Project description |
| address | string | Yes | Project address |
| surface | string | Yes | Project surface area |

---

## Email Configuration

### Environment Variables

The API requires the following environment variables for SMTP configuration:

```env
# SMTP Server Configuration
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-email-password

# Email Recipients
NEXT_PUBLIC_QUOTE_EMAIL=quotes@yourcompany.com
NEXT_PUBLIC_QUOTE_SUBJECT="New Quote Request - ATD Briques"
```

### Supported SMTP Providers

The email service works with any SMTP provider:

- **Gmail**: Use app-specific passwords
- **SendGrid**: Use API key as password
- **Outlook/Hotmail**: Use regular credentials
- **Custom SMTP**: Any standard SMTP server

### Email Templates

Each endpoint sends HTML-formatted emails with the following structure:

#### Contact Email Template
```html
<h2>Nouveau message de contact</h2>
<p><strong>Nom:</strong> [name]</p>
<p><strong>Email:</strong> [email]</p>
<p><strong>Message:</strong></p>
<p>[message]</p>
```

#### Estimate Email Template
```html
<h2>Nouvelle demande de devis</h2>
<p><strong>Nom:</strong> [name]</p>
<p><strong>Email:</strong> [email]</p>
<p><strong>Téléphone:</strong> [phone]</p>
<p><strong>Entreprise:</strong> [company] (if provided)</p>
<p><strong>Description du projet:</strong></p>
<p>[description]</p>
```

---

## Rate Limiting

Currently, there are no rate limiting measures in place. Consider implementing rate limiting for production use to prevent abuse.

**Recommended rate limits:**
- Contact form: 5 requests per hour per IP
- Estimate requests: 3 requests per hour per IP

---

## Security Considerations

### Input Validation

- All required fields are validated server-side
- Email format validation is handled by HTML5 input types
- No SQL injection risks (no database operations)
- XSS protection through proper email templating

### Data Handling

- No sensitive data is stored (emails are sent immediately)
- Form data is not logged in production
- SMTP credentials should use app-specific passwords
- Environment variables protect sensitive configuration

### CORS Policy

API routes are configured for same-origin requests only. For cross-origin usage, configure CORS headers appropriately.

---

## Testing

### Manual Testing

Use tools like Postman, curl, or browser developer tools:

```bash
# Test contact endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Integration Testing

For automated testing, ensure:
1. SMTP credentials are configured in test environment
2. Use test email addresses to avoid spam
3. Mock email service for unit tests

---

## Troubleshooting

### Common Issues

**Email not sending:**
1. Verify SMTP credentials in environment variables
2. Check if email provider requires app-specific passwords
3. Ensure SMTP_PORT matches provider requirements (usually 587)
4. Check server logs for detailed error messages

**400 Bad Request errors:**
1. Verify all required fields are included in request body
2. Check Content-Type header is set to application/json
3. Ensure JSON is properly formatted

**500 Internal Server Error:**
1. Check server logs for detailed error information
2. Verify SMTP server connectivity
3. Ensure environment variables are properly set

### Debug Mode

Enable debug logging by checking server console output. All email operations log their status and any errors encountered.

---

## Changelog

### Version 1.0.0
- Initial API implementation
- Contact form endpoint
- Estimate request endpoint
- SMTP email integration
- Error handling and validation

---

## Support

For technical issues with the API:
1. Check this documentation
2. Review server logs for error details
3. Verify environment configuration
4. Test SMTP connectivity independently

**Last Updated:** January 2025  
**API Version:** 1.0.0 