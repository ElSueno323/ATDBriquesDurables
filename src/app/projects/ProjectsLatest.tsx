'use client';
import Image from 'next/image';
import styles from './projects.module.css';
import { useTranslation } from '@/utils/useTranslation';

export default function ProjectsLatest() {
  const { t } = useTranslation();
  return (
    <section className={styles.latestSection}>
      <h2 className={styles.latestTitle}>{t.projects.latestTitle}</h2>
      <div className={styles.latestUnderline}></div>
      <div className={styles.latestGrid}>
        {t.projects.latestList.map((proj, idx) => (
          <div className={styles.latestCard} key={idx}>
            <div className={styles.latestImgBox}>
              <Image
                src={proj.img}
                alt={proj.title}
                fill
                className={styles.latestImg}
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 350px"
              />
            </div>
            <div className={styles.latestCardContent}>
              <h3 className={styles.latestCardTitle}>{proj.title}</h3>
              <p className={styles.latestCardDesc}>{proj.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 