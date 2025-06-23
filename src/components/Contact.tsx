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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
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
          <button type="submit" className={styles.sendButton}>
            {t.contact.form.sendButton}
          </button>
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