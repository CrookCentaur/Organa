import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image 
              src="/leaf.png" 
              alt="Organa" 
              width={24} 
              height={24} 
              className={styles.footerLogoIcon} 
            />
            <span>Organa</span>
          </div>
          <span className={styles.tagline}>Taxonomy</span>
        </div>
        <p className={styles.copy}>
          Identify and learn about the living world around you.
        </p>
        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Organa Taxonomy
          </span>
          <span className={styles.powered}>
            Powered by Google Gemini AI
          </span>
        </div>
      </div>
    </footer>
  );
}
