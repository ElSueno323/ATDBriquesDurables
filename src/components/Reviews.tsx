'use client';
import React from 'react';
import styles from './Reviews.module.css';
import reviewsData from '../data/reviews.json';

interface ReviewProps {
  stars: number;
  comment: string;
  clientName: string;
}

function Review({ stars, comment, clientName }: ReviewProps) {
  const renderStars = () => {
    return Array.from({ length: stars }, (_, index) => (
      <span key={index} className={styles.star}>★</span>
    ));
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.stars}>
        {renderStars()}
      </div>
      <p className={styles.comment}>&ldquo;{comment}&rdquo;</p>
      <div className={styles.clientName}>{clientName}</div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        {/* Titre de la section */}
        <h2 className={styles.title}>Témoignages Clients</h2>
        
        {/* Grille des témoignages */}
        <div className={styles.reviewsGrid}>
          {reviewsData.reviews.map((review) => (
            <Review
              key={review.id}
              stars={review.stars}
              comment={review.comment}
              clientName={review.clientName}
            />
          ))}
        </div>
        
        {/* Section des logos */}
        <div className={styles.logosSection}>
          <div className={styles.logosGrid}>
            {reviewsData.companyLogos.map((company) => (
              <div key={company.id} className={styles.logoItem}>
                <img 
                  src={company.logo} 
                  alt={company.name}
                  title={company.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 