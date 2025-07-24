'use client';
import React, { useState } from 'react';
import styles from './Contact.module.css';
import { useTranslation } from '../utils/useTranslation';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      {/* Section gauche - Formulaire */}
      <div className={styles.leftSection}>
        <h2 className={styles.title}>{t.contact.title}</h2>
        <form onSubmit={handleSubmit}>
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
              />
            </div>
          </div>
          <div className={styles.inputGroup + ' ' + styles.fullWidth}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t.contact.form.messagePlaceholder}
              className={styles.textarea}
              required
            />
          </div>
          <button type="submit" className={styles.sendButton} disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : t.contact.form.sendButton}
          </button>
          
          {submitStatus === 'success' && (
            <div style={{ color: 'white', marginTop: '10px', fontWeight: 'bold' }}>
              Message envoyé avec succès !
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div style={{ color: 'black', marginTop: '10px', fontWeight: 'bold' }}>
              {errorMessage}
            </div>
          )}
        </form>
      </div>

      {/* Section droite */}
      <div className={styles.rightSection}>
        {/* Réseaux sociaux */}
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

        {/* Informations de contact */}
        <div className={styles.infoSection}>
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
          
          <a 
            href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
            className={styles.infoItem}
          >
            <HiOutlinePhone className={styles.infoIcon} />
            <span className={styles.infoText}>
              {process.env.NEXT_PUBLIC_COMPANY_PHONE || t.contact.info.defaultPhone}
            </span>
          </a>
          
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