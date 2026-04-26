'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IconSearch } from './Icons';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/leaf.png"
            alt="Organa"
            width={64}
            height={64}
            className={styles.logoImage}
            priority
          />
          <div className={styles.logoTextWrapper}>
            <span className={styles.logoText}>Organa</span>
            <span className={styles.logoSubtext}>Taxonomy</span>
          </div>
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link
              href="/"
              className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/identify"
              className={`${styles.navLink} ${isActive('/identify') ? styles.navLinkActive : ''}`}
            >
              Identify
            </Link>
          </li>
          <li>
            <Link
              href="/history"
              className={`${styles.navLink} ${isActive('/history') ? styles.navLinkActive : ''}`}
            >
              History
            </Link>
          </li>
          <li>
            <Link href="/identify" className={styles.navCta}>
              <IconSearch size={16} /> Start Scanning
            </Link>
          </li>
        </ul>

        <button
          className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavVisible : ''}`}>
        <Link href="/" className={styles.mobileNavLink}>Home</Link>
        <Link href="/identify" className={styles.mobileNavLink}>Identify</Link>
        <Link href="/history" className={styles.mobileNavLink}>History</Link>
      </div>
    </nav>
  );
}
