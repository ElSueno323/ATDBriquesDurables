'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useTranslation } from "@/utils/useTranslation";
import { FiShoppingCart } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import UnderConstructIcon from "./UnderConstructIcon";

export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const pathname = usePathname();
  const [showCartInfo, setShowCartInfo] = useState(false);
  const cartInfoTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCartInfo(true);
    if (cartInfoTimeout.current) clearTimeout(cartInfoTimeout.current);
    cartInfoTimeout.current = setTimeout(() => setShowCartInfo(false), 2500);
  };

  useEffect(() => {
    if (!showCartInfo) return;
    const handleClickOutside = () => setShowCartInfo(false);
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCartInfo]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">{t.common.brand}</Link>
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
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Link href="/cart" className={styles.cart} aria-label={t.common.cart} onClick={handleCartClick}>
            <FiShoppingCart size={22} color="#222" />
            {showCartInfo && (
              <span className={styles.cartInfoBubble}>
                <UnderConstructIcon 
                  style={{
                    width: 20, 
                    height: 20, 
                    marginRight: 8, 
                    verticalAlign: 'middle', 
                    display: 'inline', 
                    color: 'var(--primary-color)',
                  }} 
                  aria-label={t.common.underConstructionIcon}
                />
                {t.common.underConstruction}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
} 