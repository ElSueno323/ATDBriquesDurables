'use client';
import { useState } from 'react';
import styles from './about.module.css';
import Reviews from '../../components/Reviews';

const faqs = [
  {
    question: 'Donec rutrum congue leo eget malesuada?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, dignissim tristique tellus sed faucibus nullam. Tincidunt mauris ut quam sed mauris proin feugiat.'
  },
  {
    question: 'Vivamus suscipit tortor eget felis porttitor volutpat?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, dignissim tristique tellus sed faucibus nullam.'
  },
  {
    question: 'Curabitur non nulla sit amet nisi tempus?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, dignissim tristique tellus sed faucibus nullam.'
  },
  {
    question: 'Pellentesque in ipsum id orci porta dapibus?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, dignissim tristique tellus sed faucibus nullam.'
  },
  {
    question: 'Curabitur non nulla sit amet nisi?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, dignissim tristique tellus sed faucibus nullam.'
  }
];

function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.accordion}>
      {faqs.map((faq, idx) => (
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
  return (
    <>
      <Reviews />
      <div className={styles.aboutGrid}>
      {/* Colonne gauche */}
      <div className={styles.leftCol}>
        <h2 className={styles.title}>Let&apos;s Build<br />Something<br />Together</h2>
        <div className={styles.underline}></div>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, dignissim tristique tellus sed faucibus nullam. Tincidunt mauris ut quam sed mauris proin feugiat.
        </p>
        <button className={styles.ctaBtn}>GET IN TOUCH</button>
      </div>
      {/* Colonne droite */}
      <div className={styles.rightCol}>
        <Accordion />
      </div>
    </div>
    </>
  );
} 