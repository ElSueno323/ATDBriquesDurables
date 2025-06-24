'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './PageTransition.module.css';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    });

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`${styles.pageTransition} ${isTransitioning ? styles.transitioning : ''}`}>
      {children}
    </div>
  );
} 