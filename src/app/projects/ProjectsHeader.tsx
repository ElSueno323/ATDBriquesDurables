'use client';
import { useState } from 'react';
import styles from './projects.module.css';
import EstimateModal from '@/components/EstimateModal';
import { useTranslation } from '@/utils/useTranslation';

export default function ProjectsHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={styles.headerRow}>
      <h2 className={styles.headerTitle}>{t.projects.headerTitle}</h2>
      <button className={styles.estimateBtn} onClick={() => setOpen(true)}>
        {t.projects.estimateBtn}
      </button>
      <EstimateModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
} 