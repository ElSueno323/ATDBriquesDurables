'use client';
import { useState } from 'react';
import styles from './about.module.css';
import Reviews from '../../components/Reviews';
import { useTranslation } from '../../utils/useTranslation';

function Accordion() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.accordion}>
      {t.about.faq.map((faq, idx) => (
        <div key={idx} className={openIndex === idx ? `${styles.accordionItem} ${styles.open}` : styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => handleToggle(idx)}
            role="button"
            tabIndex={0}
            aria-expanded={openIndex === idx}
          >
            <span className={styles.accordionTitle}>{faq.question}</span>
            <button
              className={styles.accordionBtn}
              aria-label={openIndex === idx ? 'Fermer' : 'Ouvrir'}
            >
              {openIndex === idx ? <span className={styles.minus}>–</span> : <span className={styles.plus}>+</span>}
            </button>
          </div>
          <div className={styles.accordionContent}>
            {openIndex === idx && faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const { t } = useTranslation();
  
  return (
    <>
      <Reviews />
      <div className={styles.aboutGrid}>
      {/* Colonne gauche */}
      <div className={styles.leftCol}>
        <h2 
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: t.about.title }}
        />
        <div className={styles.underline}></div>
        <p className={styles.desc}>
          {t.about.description}
        </p>
        <button className={styles.ctaBtn}>{t.about.ctaButton}</button>
      </div>
      {/* Colonne droite */}
      <div className={styles.rightCol}>
        <Accordion />
      </div>
    </div>
    </>
  );
} 