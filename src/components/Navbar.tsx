'use client';

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useTranslation } from "@/utils/useTranslation";

export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">ATD Briques Durables</Link>
      </div>
      <div className={styles.links}>
        <Link href="/projects">{t.navbar.projects}</Link>
        <Link href="/services">{t.navbar.services}</Link>
        <Link href="/contact">{t.navbar.contact}</Link>
        <Link href="/">{t.navbar.home}</Link>
        <Link href="/about">{t.navbar.about}</Link>
        <button 
          onClick={toggleLanguage} 
          className={styles.langButton}
        >
          {language === 'fr' ? 'EN' : 'FR'}
        </button>
        <Link href="/cart" className={styles.cart}>
          🛒
        </Link>
      </div>
    </nav>
  );
} 