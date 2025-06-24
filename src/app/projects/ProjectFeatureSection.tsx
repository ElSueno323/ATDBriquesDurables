'use client';
import Image from 'next/image';
import styles from './projects.module.css';
import { useTranslation } from '@/utils/useTranslation';

export default function ProjectFeatureSection() {
  const { t } = useTranslation();
  return (
    <section className={styles.featureSection}>
      <div className={styles.featureGrid}>
        {/* Colonne gauche : image */}
        <div className={styles.featureImgCol}>
          <Image
            src="/brick-bg.jpg"
            alt="Construction"
            fill
            className={styles.featureImg}
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        {/* Colonne droite : contenu */}
        <div className={styles.featureContentCol}>
          <div className={styles.featureContentBox}>
            <h2 className={styles.featureTitle}>{t.projects.featureTitle}</h2>
            <div className={styles.featureUnderline}></div>
            <div className={styles.featureTextRow}>
              <p>{t.projects.featureText1}</p>
              <p>{t.projects.featureText2}</p>
            </div>
          </div>
          <div className={styles.featureStatsRow}>
            <div className={styles.featureStatRed}>
              <span className={styles.featureStatNumber}>{t.projects.featureStat1Number}</span>
              <span className={styles.featureStatLabel}>{t.projects.featureStat1Label}</span>
            </div>
            <div className={styles.featureStatBlack}>
              <span className={styles.featureStatNumber}>{t.projects.featureStat2Number}</span>
              <span className={styles.featureStatLabel}>{t.projects.featureStat2Label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 