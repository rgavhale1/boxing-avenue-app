import React from 'react';
import styles from './Programs.module.css';
import ImageSlider from './ImageSlider';

export default function Programs({ onBookTrial }) {

  const slides = [
    { id: 1, src: '/images/image1.jpg', alt: 'Training Image 1' },
    { id: 2, src: '/images/image2.jpg', alt: 'Training Image 2' },
    { id: 3, src: '/images/image3.jpg', alt: 'Training Image 3' },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Best decision I've made. Training is challenging, effective and actually fun.",
      author: 'ROHIT S.',
      title: 'Client',
      avatar: 'RS',
      rating: 5
    },
    {
      id: 2,
      quote: "I've never felt stronger or more confident. Highly recommended BA Training!",
      author: 'AISHWARYA K.',
      title: 'Client',
      avatar: 'AK',
      rating: 5
    },
    {
      id: 3,
      quote: 'Personalized approach and amazing results. Worth every session.',
      author: 'KUNAL M.',
      title: 'Client',
      avatar: 'KM',
      rating: 5
    }
  ];

  return (
    <section className={styles.programs} id="programs">

      {/* Slider + Testimonials Row */}
      <div className={styles.row}>
        <div className={styles.sliderColumn}>
          <ImageSlider slides={slides} />
        </div>

        <div className={styles.testimonialColumn}>
          <div className={styles.testTitleContainer}>
            <h1 className={styles.testTitle}>WHAT CLIENTS SAY</h1>
          </div>

          <div className={styles.testList}>
            {testimonials.map((t) => (
              <div key={t.id} className={styles.testCard}>
                <div className={styles.quoteWrapper}>
                  <span className={styles.quoteMark}>"</span>
                  <p className={styles.testQuote}>{t.quote}</p>
                </div>

                <div className={styles.clientInfo}>
                  <div className={styles.clientAvatar}>
                    {t.avatar}
                  </div>

                  <div>
                    <p className={styles.testAuthor}>{t.author}</p>
                    <span className={styles.clientRole}>{t.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}