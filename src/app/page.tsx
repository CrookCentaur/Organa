import Link from 'next/link';
import {
  IconSearch,
  IconCamera,
  IconDNA,
  IconDocument,
  IconLeaf,
  IconPaw,
  IconButterfly,
  IconBird,
  IconArrowRight,
} from '@/components/Icons';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            <IconLeaf size={16} /> AI-Powered Organism Identification
          </span>
          <h1 className={styles.heroTitle}>
            Discover the{' '}
            <span className={styles.heroTitleAccent}>Living World</span>
            {' '}Around You
          </h1>
          <p className={styles.heroSubtitle}>
            Snap a photo of any plant, animal, insect, or bird — get instant
            identification and practical care information tailored for
            gardeners, farmers, and pet owners.
          </p>
          <div className={styles.heroCta}>
            <Link href="/identify" className={styles.heroPrimary} id="hero-cta">
              <IconSearch size={18} /> Start Identifying
            </Link>
            <Link href="#how-it-works" className={styles.heroSecondary}>
              How It Works <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks} id="how-it-works">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>
            Three simple steps to identify any organism
          </p>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <IconCamera size={32} />
              </div>
              <div className={styles.stepNumber}>Step 01</div>
              <h3 className={styles.stepTitle}>Capture</h3>
              <p className={styles.stepDesc}>
                Take a photo or upload an image of any organism you encounter
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <IconDNA size={32} />
              </div>
              <div className={styles.stepNumber}>Step 02</div>
              <h3 className={styles.stepTitle}>Identify</h3>
              <p className={styles.stepDesc}>
                Our AI analyzes the image and identifies the species with confidence scoring
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <IconDocument size={32} />
              </div>
              <div className={styles.stepNumber}>Step 03</div>
              <h3 className={styles.stepTitle}>Learn &amp; Care</h3>
              <p className={styles.stepDesc}>
                Get detailed care guides — watering tips for plants, habitat info for animals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organism Types */}
      <section className={styles.typesSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>What Can You Identify?</h2>
          <p className={styles.sectionSubtitle}>
            From your backyard garden to wild encounters
          </p>
          <div className={styles.typesGrid}>
            <div className={styles.typeCard}>
              <span className={styles.typeEmoji}><IconLeaf size={40} /></span>
              <h3 className={styles.typeTitle}>Plants</h3>
              <p className={styles.typeDesc}>
                Flowers, fruits, vegetables, houseplants, trees, herbs, and more
              </p>
              <span className={`${styles.typeTag} ${styles.tagPlant}`}>
                Farming &amp; Gardening Tips
              </span>
            </div>
            <div className={styles.typeCard}>
              <span className={styles.typeEmoji}><IconPaw size={40} /></span>
              <h3 className={styles.typeTitle}>Animals</h3>
              <p className={styles.typeDesc}>
                Mammals, reptiles, amphibians, fish, and all vertebrates
              </p>
              <span className={`${styles.typeTag} ${styles.tagAnimal}`}>
                Habitat &amp; Care Guides
              </span>
            </div>
            <div className={styles.typeCard}>
              <span className={styles.typeEmoji}><IconButterfly size={40} /></span>
              <h3 className={styles.typeTitle}>Insects</h3>
              <p className={styles.typeDesc}>
                Butterflies, bees, beetles, spiders, and all arthropods
              </p>
              <span className={`${styles.typeTag} ${styles.tagInsect}`}>
                Pest or Beneficial?
              </span>
            </div>
            <div className={styles.typeCard}>
              <span className={styles.typeEmoji}><IconBird size={40} /></span>
              <h3 className={styles.typeTitle}>Birds</h3>
              <p className={styles.typeDesc}>
                Songbirds, raptors, waterfowl, and all avian species
              </p>
              <span className={`${styles.typeTag} ${styles.tagBird}`}>
                Birdwatching &amp; Habitat
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Built For Section */}
      <section className={styles.audience}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Built For You</h2>
          <p className={styles.sectionSubtitle}>
            Whether you grow food, keep pets, or love nature
          </p>
          <div className={styles.audienceGrid}>
            <div className={styles.audienceCard}>
              <span className={styles.audienceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3C12 3 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 12 3 12 3Z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M12 10V18M12 14L9 17M12 12L15 15" stroke="#8FD694" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className={styles.audienceTitle}>Farmers</h3>
              <p className={styles.audienceDesc}>
                Identify crop diseases, beneficial insects, and get precise
                growing guides for your harvest.
              </p>
            </div>
            <div className={styles.audienceCard}>
              <span className={styles.audienceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                  <line x1="12" y1="2" x2="12" y2="5" stroke="#8FD694" strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="19" x2="12" y2="22" stroke="#8FD694" strokeWidth="2" strokeLinecap="round" />
                  <line x1="2" y1="12" x2="5" y2="12" stroke="#8FD694" strokeWidth="2" strokeLinecap="round" />
                  <line x1="19" y1="12" x2="22" y2="12" stroke="#8FD694" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className={styles.audienceTitle}>Gardeners</h3>
              <p className={styles.audienceDesc}>
                Discover companion plants, learn pest management, and get
                tailored care tips for every species.
              </p>
            </div>
            <div className={styles.audienceCard}>
              <span className={styles.audienceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <ellipse cx="7" cy="8" rx="2" ry="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
                  <ellipse cx="17" cy="8" rx="2" ry="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
                  <ellipse cx="4.5" cy="13" rx="1.8" ry="2.2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
                  <ellipse cx="19.5" cy="13" rx="1.8" ry="2.2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" />
                  <path d="M8.5 16C8.5 16 9.5 20 12 20C14.5 20 15.5 16 15.5 16C15.5 14 14 13 12 13C10 13 8.5 14 8.5 16Z" stroke="#8FD694" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className={styles.audienceTitle}>Pet Owners</h3>
              <p className={styles.audienceDesc}>
                Understand your pet&apos;s needs, identify safe vs. toxic
                plants, and learn about wild visitors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
