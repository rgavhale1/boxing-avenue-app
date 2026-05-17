import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ onBookTrial }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Coaches', id: 'Coaches' },
    { name: 'Fightstore', id: 'Fightstore' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id) => {
    setMenuOpen(false);
    // Navigate to home first, then scroll to section
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.logo}>
        <img src="/images/logo.jpg" alt="BA Logo" className={styles.navLogoImage} />
      </div>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map(link => (
          <li key={link.id}>
            <button 
              onClick={() => handleNavClick(link.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 'inherit', padding: 0 }}
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.ctaGroup}>
        <button className={styles.ctaBtn} onClick={onBookTrial}>
          BOOK A SESSION
        </button>
        <Link to="/login" className={styles.adminBtn}>
          Admin
        </Link>
      </div>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.bar1Open : styles.bar}></span>
        <span className={menuOpen ? styles.bar2Open : styles.bar}></span>
        <span className={menuOpen ? styles.bar3Open : styles.bar}></span>
      </button>
    </nav>
  );
}