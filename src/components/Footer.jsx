import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ onBookTrial }) {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <div className={styles.logoWrap}>
              <img src="/images/logo.jpg" alt="BA Logo" className={styles.logoImage} />
            </div>
          </div>

          {/* Contact */}
          <div className={styles.contactSection}>
            <h3>Contact Us</h3>
            <p>📧 boxingavenueofficial@gmail.com</p>
            <p>📱 +91 9307065559</p>
          </div>

          {/* Address */}
          <div className={styles.addressSection}>
            <h3>Address</h3>
            <p>Boxing Avenue</p>
            <p>3rd Floor, above ALPHA FIT gym</p>
            <p>Dharampeth Square, Gorepeth</p>
            <p>Nagpur, Maharashtra 440010</p>
          </div>

          {/* Social */}
          <div className={styles.socialSection}>
            <h3>FOLLOW ME</h3>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/boxingavenueofficial" target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.socialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </a>

              <a href="https://www.facebook.com/boxingavenueofficial" target="_blank" rel="noreferrer" aria-label="Facebook" className={styles.socialBtn}>
                <svg width="14" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.95v-7.04H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.91h-2.3v7.04C18.34 21.2 22 17.06 22 12.07z" fill="currentColor"/>
                </svg>
              </a>

              <a href="https://www.youtube.com/@boxingavenueofficial" target="_blank" rel="noreferrer" aria-label="YouTube" className={styles.socialBtn}>
                <svg width="18" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.58A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.8.58 9.4.58 9.4.58s7.6 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" fill="currentColor"/>
                </svg>
              </a>

              <a href="https://wa.me/919307065559" target="_blank" rel="noreferrer" aria-label="WhatsApp" className={styles.socialBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.373 0 .028 4.69 0 11.06 0 13.28.6 15.36 1.74 17.14L0 24l7.36-1.9A11.97 11.97 0 0 0 12 24c6.627 0 12-4.69 12-10.94 0-2.94-1.46-5.6-3.5-7.56z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>© 2026 BA Training. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
