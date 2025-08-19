/**
 * @fileoverview Navigation bar component with language toggle and responsive design
 * @description Main navigation component that provides site navigation, language switching,
 * and cart functionality. Features active link highlighting and under-construction notifications.
 */

'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { useTranslation } from "@/utils/useTranslation";
import { FiShoppingCart } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import UnderConstructIcon from "./UnderConstructIcon";
import Image from "next/image";

/**
 * Navigation bar component with bilingual support and responsive design
 * 
 * @component
 * @returns {JSX.Element} The rendered navigation bar
 * 
 * @features
 * - Bilingual navigation (French/English)
 * - Active link highlighting based on current route
 * - Language toggle functionality
 * - Shopping cart with under-construction notification
 * - Responsive design with mobile-friendly layout
 * - Company logo with home link
 * 
 * @example
 * ```tsx
 * // Used in layout.tsx
 * <Navbar />
 * ```
 * 
 * @dependencies
 * - useTranslation: Custom hook for internationalization
 * - usePathname: Next.js hook for current route detection
 * - React Icons: For shopping cart icon
 * - CSS Modules: For component-scoped styling
 */
export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const pathname = usePathname();
  const [showCartInfo, setShowCartInfo] = useState(false);
  const cartInfoTimeout = useRef<NodeJS.Timeout | null>(null);

  /**
   * Toggles between French and English languages
   * Updates the global language state via translation context
   */
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  /**
   * Maps translation data to navigation items
   * @type {Array<{href: string, label: string}>}
   */
  const navItems = t.navbar.map((item) => ({
    href: item.url,
    label: item.name
  }));

  /**
   * Determines if a navigation link is currently active
   * @param {string} href - The href to check against current pathname
   * @returns {boolean} True if the link should be highlighted as active
   */
  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  /**
   * Handles cart icon click - shows under construction notification
   * @param {React.MouseEvent} e - Click event
   */
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCartInfo(true);
    if (cartInfoTimeout.current) clearTimeout(cartInfoTimeout.current);
    cartInfoTimeout.current = setTimeout(() => setShowCartInfo(false), 2500);
  };

  /**
   * Effect to handle clicking outside cart info bubble
   * Closes the notification when user clicks elsewhere
   */
  useEffect(() => {
    if (!showCartInfo) return;
    const handleClickOutside = () => setShowCartInfo(false);
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCartInfo]);

  return (
    <nav className={styles.navbar}>
      {/* Company logo with home link */}
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.png" alt={t.common.brand} width={100} height={100} />
        </Link>
      </div>
      
      {/* Navigation links and controls */}
      <div className={styles.links}>
        {/* Main navigation links */}
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
        
        {/* Language toggle button */}
        <button 
          onClick={toggleLanguage} 
          className={styles.langButton}
          aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
        >
          {language === 'fr' ? 'EN' : 'FR'}
        </button>
        
        {/* Shopping cart with under construction notification */}
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