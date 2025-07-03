'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useTranslation } from "@/utils/useTranslation";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navItems = t.navbar.map((item) => ({
    href: item.url,
    label: item.name
  }));

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">ATD Briques</Link>
      </div>
      <div className={styles.links}>
        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button 
          onClick={toggleLanguage} 
          className={styles.langButton}
        >
          {language === 'fr' ? 'EN' : 'FR'}
        </button>
        <Link href="/cart" className={styles.cart} aria-label="Panier">
          <FiShoppingCart size={22} color="#222" />
        </Link>
      </div>
    </nav>
  );
} 