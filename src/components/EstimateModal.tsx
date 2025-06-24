"use client";
import { useState } from "react";
import styles from "./EstimateModal.module.css";
import { useTranslation } from "@/utils/useTranslation";

export default function EstimateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    description: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Nom et prénom requis";
    if (!form.email.trim()) newErrors.email = "Email requis";
    if (!form.description.trim()) newErrors.description = "Description requise";
    return newErrors;
  };

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
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">×</button>
        <h2>{t.contact.formConsultation.title}</h2>
        {sent ? (
          <div className={styles.success}>{t.contact.formConsultation.success}</div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
            <label>
              {t.contact.formConsultation.nameTitle}<br />
              <input name="name" value={form.name} onChange={handleChange} required placeholder={t.contact.formConsultation.namePlaceholder}/>
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </label>
            <label>
              {t.contact.formConsultation.companyTitle}<br />
              <input name="company" value={form.company} onChange={handleChange} placeholder={t.contact.formConsultation.companyPlaceholder}/>
            </label>
            <label>
              {t.contact.formConsultation.emailTitle}<br />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder={t.contact.formConsultation.emailPlaceholder}/>
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </label>
            <label>
              {t.contact.formConsultation.phoneTitle}<br />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder={t.contact.formConsultation.phonePlaceholder}/>
            </label>
            <label>
              {t.contact.formConsultation.messageTitle}<br />
              <textarea name="description" value={form.description} onChange={handleChange} required rows={4} placeholder={t.contact.formConsultation.messagePlaceholder}/>
              {errors.description && <span className={styles.error}>{errors.description}</span>}
            </label>
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Envoi en cours...' : t.contact.formConsultation.submit}
            </button>
            
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