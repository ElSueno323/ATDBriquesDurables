import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Section Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1>ATD Briques Durables</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lectus erat consectetur eu sapien eget, rhoncus consectetur sem.</p>
          <button className={styles.cta}>VIEW OUR WORK</button>
        </div>
      </section>

      {/* Grille des caractéristiques */}
      <section className={styles.featuresGrid}>
        <div className={styles.feature}>
          <Image src="/icons/building.svg" alt="Building Construction" width={48} height={48} />
          <h3>Building Construction</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lectus erat</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/repairs.svg" alt="Building Repairs" width={48} height={48} />
          <h3>Building Repairs</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lectus erat</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/demolition.svg" alt="Demolition" width={48} height={48} />
          <h3>Demolition</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lectus erat</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/foundation.svg" alt="Foundation" width={48} height={48} />
          <h3>Foundation</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lectus erat</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/painting.svg" alt="Painting & Exterior" width={48} height={48} />
          <h3>Painting & Exterior</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lectus erat</p>
        </div>
        <div className={styles.feature}>
          <Image src="/icons/site.svg" alt="Site Management" width={48} height={48} />
          <h3>Site Management</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lectus erat</p>
        </div>
      </section>

      {/* Section 3 colonnes */}
      <section className={styles.bottomSection}>
        <div className={styles.bottomColLeft}>
          <h4>Eco Friendly Construction</h4>
          <p>Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</p>
          <h4>The Newest Technology Repairs</h4>
          <p>Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</p>
          <h4>High Quality Construction Management</h4>
          <p>Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</p>
        </div>
        <div className={styles.bottomColCenter}>
          <h2>No Project Too Big Or Too Small</h2>
          <p>Lorem ipsum dolor sit amet, consectetur eu sapien eget, rhoncus consectetur sem. Proin cursus, dolor a mollis consectetur, risus dolor fermentum massa, a commodo elit dui sit amet risus. Maecenas ornare felis a tortor ultrices dictum.</p>
        </div>
        <div className={styles.bottomColRight}>
          <div className={styles.consultationBox}>
            <span>Get Free Consultation</span>
            <button className={styles.estimateBtn}>ONLINE ESTIMATE FORM</button>
          </div>
        </div>
      </section>
    </div>
  );
}
