'use client';

import { useTranslation } from "@/utils/useTranslation";
import styles from "./page.module.css";
import Image from "next/image";
import EstimateModal from "@/components/EstimateModal";
import { useState } from "react";

export default function Home() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.home}>
      {/* Section Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1 style={{ color: 'white' }}>{t.home.hero.title}</h1>
          <p >{t.home.hero.description}</p>
          <button className={styles.cta}>{t.home.hero.cta}</button>
        </div>
      </section>

      {/* Grille des caractéristiques */}
      <section className={styles.featuresGrid}>
        <div className={styles.feature}>
          <Image src="/icons/building.svg" alt={t.home.features.building.title} width={48} height={48} />
          <h3>{t.home.features.building.title}</h3>
          <p>{t.home.features.building.desc}</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/repairs.svg" alt={t.home.features.repairs.title} width={48} height={48} />
          <h3>{t.home.features.repairs.title}</h3>
          <p>{t.home.features.repairs.desc}</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/demolition.svg" alt={t.home.features.demolition.title} width={48} height={48} />
          <h3>{t.home.features.demolition.title}</h3>
          <p>{t.home.features.demolition.desc}</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/foundation.svg" alt={t.home.features.foundation.title} width={48} height={48} />
          <h3>{t.home.features.foundation.title}</h3>
          <p>{t.home.features.foundation.desc}</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/painting.svg" alt={t.home.features.painting.title} width={48} height={48} />
          <h3>{t.home.features.painting.title}</h3>
          <p>{t.home.features.painting.desc}</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/site.svg" alt={t.home.features.site.title} width={48} height={48} />
          <h3>{t.home.features.site.title}</h3>
          <p>{t.home.features.site.desc}</p>
        </div>
      </section>

      {/* Section 3 colonnes */}
      <section className={styles.gridSection}>
        <div className={styles.gridItemLeft}>
          <h4>{t.home.bottom.eco.title}</h4>
          <p>{t.home.bottom.eco.desc}</p>
          <h4>{t.home.bottom.tech.title}</h4>
          <p>{t.home.bottom.tech.desc}</p>
          <h4>{t.home.bottom.quality.title}</h4>
          <p>{t.home.bottom.quality.desc}</p>
        </div>
        <div className={styles.gridItemCenter}>
          <h2>{t.home.bottom.centerTitle}</h2>
          <p>{t.home.bottom.centerDesc}</p>
        </div>
        <div className={styles.gridItemRight}>
          <div className={styles.consultationBox}>
            <span>{t.home.bottom.consultation}</span>
            <button className={styles.estimateBtn} onClick={() => setOpenModal(true)}>{t.home.bottom.estimateBtn}</button>
          </div>
        </div>
      </section>
      <EstimateModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
