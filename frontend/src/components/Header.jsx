import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#sustainability', label: 'Sustainability' },
    { href: '#companies', label: 'Our Companies' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <header className="forest-header">
      <div className="container">
        <nav className="nav-wrapper">
          <div className="forest-logo">
            <h2 className="heading-3" style={{ margin: 0, color: 'var(--text-white)' }}>
              Forest Vision Alliance
            </h2>
          </div>
          
          {/* Desktop Navigation */}
          <div className="forest-nav desktop-nav">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="forest-nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .forest-header {
          background: var(--bg-page);
          position: fixed;
          top: 32px;
          width: 100%;
          z-index: 99999;
          padding: 0 12px;
        }
        
        .nav-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          background: var(--brand-primary);
          border-radius: 25px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 8px rgba(27, 67, 50, 0.25);
        }
        
        .forest-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        
        .forest-nav-link {
          color: var(--text-white);
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.2s ease;
        }
        
        .forest-nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }
        
        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .mobile-nav {
          background: var(--brand-primary);
          border-radius: 20px;
          margin-top: 8px;
          padding: 16px;
          display: none;
          flex-direction: column;
          gap: 8px;
        }
        
        .mobile-nav-link {
          color: var(--text-white);
          text-decoration: none;
          padding: 12px 16px;
          border-radius: 16px;
          transition: background 0.2s ease;
        }
        
        .mobile-nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 781px) {
          .forest-header {
            top: 0;
            position: fixed;
          }
          
          .nav-wrapper {
            border-radius: 0;
            padding: 16px;
          }
          
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .mobile-nav {
            display: ${isMenuOpen ? 'flex' : 'none'};
          }
        }
        
        @media (min-width: 782px) {
          .desktop-nav {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;