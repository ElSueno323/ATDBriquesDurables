/**
 * @fileoverview Contact form component with social media links and company information
 * @description Full-featured contact section with form submission, social media integration,
 * and dynamic company information display. Handles form validation and API communication.
 */

'use client';
import React, { useState } from 'react';
import styles from './Contact.module.css';
import { useTranslation } from '../utils/useTranslation';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';

/**
 * Contact form interface for type safety
 */
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Form submission states for user feedback
 */
type SubmitStatus = 'idle' | 'success' | 'error';

/**
 * Contact component with form submission and company information display
 * 
 * @component
 * @returns {JSX.Element} The rendered contact section
 * 
 * @features
 * - Contact form with validation and submission
 * - Social media links (configurable via environment variables)
 * - Company information display (address, phone, email)
 * - Form state management with loading and error states
 * - Responsive two-column layout
 * - Internationalization support
 * 
 * @example
 * ```tsx
 * // Used in About page or as standalone contact section
 * <Contact />
 * ```
 * 
 * @dependencies
 * - useTranslation: For internationalized content
 * - React Icons: For social media and contact icons
 * - CSS Modules: For component-scoped styling
 * - Contact API: /api/contact endpoint for form submission
 */
export default function Contact() {
  const { t } = useTranslation();
  
  // Form state management
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Handles form input changes and updates state
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles form submission with API call and error handling
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        setErrorMessage(errorData.error || 'Une erreur est survenue');
      }
         } catch (error) {
       console.error('Erreur lors de l\'envoi:', error);
       setSubmitStatus('error');
       setErrorMessage('Erreur de connexion. Veuillez réessayer.');
     } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      {/* Left section - Contact Form */}
      <div className={styles.leftSection}>
        <h2 className={styles.title}>{t.contact.title}</h2>
        <form onSubmit={handleSubmit}>
          {/* Form input grid */}
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t.contact.form.namePlaceholder}
                className={styles.input}
                required
                aria-label={t.contact.form.namePlaceholder}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.contact.form.emailPlaceholder}
                className={styles.input}
                required
                aria-label={t.contact.form.emailPlaceholder}
              />
            </div>
          </div>
          
          {/* Message textarea */}
          <div className={styles.inputGroup + ' ' + styles.fullWidth}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t.contact.form.messagePlaceholder}
              className={styles.textarea}
              required
              aria-label={t.contact.form.messagePlaceholder}
            />
          </div>
          
          {/* Submit button */}
          <button type="submit" className={styles.sendButton} disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : t.contact.form.sendButton}
          </button>
          
          {/* Success message */}
          {submitStatus === 'success' && (
            <div style={{ color: 'white', marginTop: '10px', fontWeight: 'bold' }}>
              Message envoyé avec succès !
            </div>
          )}
          
          {/* Error message */}
          {submitStatus === 'error' && (
            <div style={{ color: 'black', marginTop: '10px', fontWeight: 'bold' }}>
              {errorMessage}
            </div>
          )}
        </form>
      </div>

      {/* Right section - Social media and contact info */}
      <div className={styles.rightSection}>
        {/* Social media links */}
        <div className={styles.socialSection}>
          <a 
            href={process.env.NEXT_PUBLIC_FACEBOOK_URL || '#'} 
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a 
            href={process.env.NEXT_PUBLIC_X_URL || '#'} 
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <FaXTwitter />
          </a>
          <a 
            href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '#'} 
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a 
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'} 
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Company contact information */}
        <div className={styles.infoSection}>
          {/* Address with Google Maps link */}
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '')}`}
            className={styles.infoItem}
            target="_blank"
            rel="noopener noreferrer"
          >
            <HiOutlineLocationMarker className={styles.infoIcon} />
            <span className={styles.infoText}>
              {process.env.NEXT_PUBLIC_COMPANY_ADDRESS || t.contact.info.defaultAddress}
            </span>
          </a>
          
          {/* Phone number with tel: link */}
          <a 
            href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
            className={styles.infoItem}
          >
            <HiOutlinePhone className={styles.infoIcon} />
            <span className={styles.infoText}>
              {process.env.NEXT_PUBLIC_COMPANY_PHONE || t.contact.info.defaultPhone}
            </span>
          </a>
          
          {/* Email with mailto: link */}
          <a 
            href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
            className={styles.infoItem}
          >
            <HiOutlineMail className={styles.infoIcon} />
            <span className={styles.infoText}>
              {process.env.NEXT_PUBLIC_COMPANY_EMAIL || t.contact.info.defaultEmail}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
} 