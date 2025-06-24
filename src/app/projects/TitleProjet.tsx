'use client';
import Image from 'next/image';
import styles from './projects.module.css';
import { useTranslation } from '@/utils/useTranslation';

export default function TitleProjet() {
  const { t } = useTranslation();
  return (
    <div className={styles.hero}>
      <Image
        src="/brick-bg.jpg"
        alt="Briques - Projets"
        fill
        priority
        className={styles.heroImg}
      />
      <div className={styles.heroOverlay} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{t.projects.heroTitle}</h1>
        <p className={styles.heroDesc}>
          {t.projects.heroDesc}
        </p>
      </div>
    </div>
  );
} 