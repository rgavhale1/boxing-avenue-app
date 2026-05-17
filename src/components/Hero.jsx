import React from 'react';
import styles from './Hero.module.css';
import ImageSlider from './ImageSlider';

export default function Hero({ onBookTrial }) {

  const heroSlides = [
    { id: 1, src: '/images/hybrid.jpg', alt: 'Hybrid Training' },
    { id: 2, src: '/images/muaythai.jpg', alt: 'Muay Thai' },
    { id: 3, src: '/images/offer.jpg', alt: 'Offer' }
    ];

  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.tag}>PERSONAL TRAINING</p>
          <h1 className={styles.title}>
            STRONGER<br />EVERY DAY.
          </h1>
          <p className={styles.subtitle}>
            Personalized training. Real results.<br />Built around you.
          </p>

          <div className={styles.buttons}>
            <button className={styles.bookBtn} onClick={onBookTrial}>
              BOOK A SESSION
            </button>
            <a href="#programs" className={styles.programsBtn}>
              OUR PROGRAMS →
            </a>
          </div>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <ImageSlider slides={heroSlides} />
      </div>
    </section>
  );
}