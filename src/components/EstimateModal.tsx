/**
 * @fileoverview Estimate request modal component with form validation and submission
 * @description Modal dialog for collecting project estimate requests with comprehensive
 * form validation, API integration, and user feedback. Used for lead generation.
 */

"use client";
import { useState } from "react";
import styles from "./EstimateModal.module.css";
import { useTranslation } from "@/utils/useTranslation";

/**
 * Estimate form data interface for type safety
 */
interface EstimateFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  description: string;
}

/**
 * Form validation errors interface
 */
interface FormErrors {
  [key: string]: string;
}

/**
 * Props interface for the EstimateModal component
 */
interface EstimateModalProps {
  /** Whether the modal is open/visible */
  open: boolean;
  /** Callback function to close the modal */
  onClose: () => void;
}

/**
 * Modal component for estimate/quote requests with form validation
 * 
 * @component
 * @param {EstimateModalProps} props - Component props
 * @returns {JSX.Element | null} The rendered modal or null if closed
 * 
 * @features
 * - Modal overlay with click-outside-to-close functionality
 * - Comprehensive form with client and project information
 * - Real-time form validation with error display
 * - API integration for estimate submission
 * - Loading states and success/error feedback
 * - Internationalization support
 * - Responsive design for mobile devices
 * 
 * @example
 * ```tsx
 * const [modalOpen, setModalOpen] = useState(false);
 * 
 * <EstimateModal 
 *   open={modalOpen} 
 *   onClose={() => setModalOpen(false)} 
 * />
 * ```
 * 
 * @dependencies
 * - useTranslation: For internationalized content
 * - Estimate API: /api/estimate endpoint for form submission
 * - CSS Modules: For modal styling and animations
 */
export default function EstimateModal({ open, onClose }: EstimateModalProps) {
  const { t } = useTranslation();
  
  // Form state management
  const [form, setForm] = useState<EstimateFormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    description: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Don't render if modal is closed
  if (!open) return null;

  /**
   * Handles form input changes and updates state
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Validates form data and returns error object
   * @returns {FormErrors} Object containing validation errors
   */
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Nom et prénom requis";
    if (!form.email.trim()) newErrors.email = "Email requis";
    if (!form.description.trim()) newErrors.description = "Description requise";
    return newErrors;
  };

  /**
   * Handles form submission with validation and API call
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setErrorMessage('');
      
      try {
        const response = await fetch('/api/estimate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setSent(true);
          // Reset form after successful submission
          setForm({
            name: "",
            company: "",
            email: "",
            phone: "",
            description: ""
          });
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.error || 'Une erreur est survenue');
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        setErrorMessage('Erreur de connexion. Veuillez réessayer.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">×</button>
        
        {/* Modal title */}
        <h2>{t.contact.formConsultation.title}</h2>
        
        {sent ? (
          /* Success message */
          <div className={styles.success}>{t.contact.formConsultation.success}</div>
        ) : (
          /* Estimate request form */
          <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
            {/* Name field (required) */}
            <label>
              {t.contact.formConsultation.nameTitle}<br />
              <input 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                required 
                placeholder={t.contact.formConsultation.namePlaceholder}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <span id="name-error" className={styles.error}>{errors.name}</span>}
            </label>
            
            {/* Company field (optional) */}
            <label>
              {t.contact.formConsultation.companyTitle}<br />
              <input 
                name="company" 
                value={form.company} 
                onChange={handleChange} 
                placeholder={t.contact.formConsultation.companyPlaceholder}
              />
            </label>
            
            {/* Email field (required) */}
            <label>
              {t.contact.formConsultation.emailTitle}<br />
              <input 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                placeholder={t.contact.formConsultation.emailPlaceholder}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <span id="email-error" className={styles.error}>{errors.email}</span>}
            </label>
            
            {/* Phone field (optional) */}
            <label>
              {t.contact.formConsultation.phoneTitle}<br />
              <input 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                placeholder={t.contact.formConsultation.phonePlaceholder}
              />
            </label>
            
            {/* Project description field (required) */}
            <label>
              {t.contact.formConsultation.messageTitle}<br />
              <textarea 
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                required 
                rows={4} 
                placeholder={t.contact.formConsultation.messagePlaceholder}
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              {errors.description && <span id="description-error" className={styles.error}>{errors.description}</span>}
            </label>
            
            {/* Submit button */}
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Envoi en cours...' : t.contact.formConsultation.submit}
            </button>
            
            {/* Error message display */}
            {errorMessage && (
              <div style={{ color: 'red', marginTop: '10px', fontSize: '0.9rem' }}>
                {errorMessage}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
} 